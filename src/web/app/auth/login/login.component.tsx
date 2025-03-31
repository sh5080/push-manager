import { useAuth } from "app/common/hooks/useAuth.hook";

export function LoginForm() {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useAuth();

  return (
    <form id="loginForm" onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="이메일을 입력하세요"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-sm text-white rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-400"
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-12">
            <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
          </div>
        ) : (
          "로그인"
        )}
      </button>
    </form>
  );
}
