const os = require("os");
const fs = require("fs");
const path = require("path");

function getNetworkIP() {
  const platform = os.platform();
  const interfaces = os.networkInterfaces();

  if (platform === "darwin") {
    // macOS
    const en0 = interfaces["en0"];
    if (en0) {
      const ipv4 = en0.find((ip) => ip.family === "IPv4");
      if (ipv4) {
        return ipv4.address;
      }
    }
  } else if (platform === "win32") {
    // Windows
    // 이더넷 또는 와이파이 인터페이스 찾기
    for (const [name, iface] of Object.entries(interfaces)) {
      // 'Wi-Fi' 또는 'Ethernet'이라는 이름을 가진 인터페이스 찾기
      if (name.includes("Wi-Fi") || name.includes("Ethernet")) {
        const ipv4 = iface.find((ip) => ip.family === "IPv4" && !ip.internal);
        if (ipv4) {
          return ipv4.address;
        }
      }
    }
  }

  // 적절한 인터페이스를 찾지 못한 경우
  console.warn(
    `Warning: Could not find network interface for ${platform}. Using fallback IP.`
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
