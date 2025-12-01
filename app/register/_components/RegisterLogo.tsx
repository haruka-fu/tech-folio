interface RegisterLogoProps {
  isAuthenticated: boolean;
}

export default function RegisterLogo({ isAuthenticated }: RegisterLogoProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex justify-center">
        <div className="size-16 text-[#2b6cee]">
          <svg
            aria-hidden
            className="text-[#2b6cee]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.38 2.22c-2.33-1.04-5.1-.34-6.6 1.77-1.13 1.59-.8 3.7.69 4.85 1.15.89 2.69 1.15 4.09.73l2.81 3.65-4.2 4.14-3.72-3.66a1.003 1.003 0 0 0-1.42 1.42l4.42 4.36c.39.39 1.02.39 1.41 0l4.9-4.83c.2-.2.33-.45.39-.73H17a3 3 0 0 0 3-3V6c0-1.65-1.35-3-3-3h-3.3c-.22 0-.44-.06-.62-.18zM17 10h-3.23c.53.53.86 1.25.86 2.05 0 1.63-1.32 2.95-2.95 2.95S8.73 13.68 8.73 12.05c0-.8.33-1.52.86-2.05H8.73A3.009 3.009 0 0 0 5.78 12.8l2.92 2.87c.39.39 1.02.39 1.41 0l3.19-3.15c.35-.35.56-.83.56-1.36V6.05c.86.66 1.43 1.73 1.43 2.95V10z" />
          </svg>
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-black text-[#1f2937]">
        TechFolio
      </h1>
      <p className="text-base text-[#6b7280]">
        {isAuthenticated ? 'プロフィールを完成させましょう' : 'Googleアカウントで登録'}
      </p>
    </div>
  );
}
