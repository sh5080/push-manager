const os = require("os");
const fs = require("fs");
const path = require("path");

function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  const platform = os.platform();

  // 맥OS인 경우 en0 인터페이스 확인
  if (platform === "darwin") {
    const en0 = interfaces["en0"];
    if (en0) {
      const internalIP = en0.find((ip) => ip.family === "IPv4" && !ip.internal);

      if (internalIP) {
        console.log(`[Network Info] Interface: en0`);
        console.log(`[Network Info] IP Family: ${internalIP.family}`);
        console.log(`[Network Info] Internal: ${internalIP.internal}`);
        console.log(`[Network Info] Found IP: ${internalIP.address}`);
        return internalIP.address;
      }
    }
  }

  // 윈도우 또는 기타 OS의 경우 10.x.x.x IP 찾기
  for (const [name, iface] of Object.entries(interfaces)) {
    if (!iface) continue;

    const internalIP = iface.find(
      (ip) =>
        ip.family === "IPv4" && !ip.internal && ip.address.startsWith("10.")
    );

    if (internalIP) {
      console.log(`[Network Info] Interface: ${name}`);
      console.log(`[Network Info] IP Family: ${internalIP.family}`);
      console.log(`[Network Info] Internal: ${internalIP.internal}`);
      console.log(
        `[Network Info] Found internal network: ${internalIP.address}`
      );
      return internalIP.address;
    }
  }

  // 모든 네트워크 인터페이스 정보 출력 (디버깅용)
  console.log("[Debug] Available network interfaces:");
  for (const [name, iface] of Object.entries(interfaces)) {
    if (!iface) continue;
    console.log(`[Debug] Interface ${name}:`);
    iface.forEach((ip) => {
      console.log(
        `[Debug]   - ${ip.family}: ${ip.address} (internal: ${ip.internal})`
      );
    });
  }

  console.warn(
    `[Warning] Could not find appropriate network interface. Using fallback IP.`
  );
  return "127.0.0.1";
}

const ip = getNetworkIP();
const envContent = `NEXT_PUBLIC_FRONTEND_URL=http://${ip}`;

// shared .env 파일 업데이트
const envPath = path.resolve(__dirname, "../src/shared/.env");

// 기존 .env 파일의 다른 내용을 보존
let currentEnv = "";
try {
  currentEnv = fs.readFileSync(envPath, "utf8");
} catch (error) {
  // 파일이 없는 경우 무시
}

// NEXT_PUBLIC_FRONTEND_URL만 업데이트하고 나머지는 유지
const envLines = currentEnv.split("\n");
const newEnvLines = envLines.filter(
  (line) => !line.startsWith("NEXT_PUBLIC_FRONTEND_URL=")
);
newEnvLines.push(envContent);

fs.writeFileSync(envPath, newEnvLines.join("\n"), "utf8");

console.log(`OS: ${os.platform()}`);
console.log(
  `환경변수가 업데이트되었습니다: NEXT_PUBLIC_FRONTEND_URL=http://${ip}`
);

module.exports = { getNetworkIP };
