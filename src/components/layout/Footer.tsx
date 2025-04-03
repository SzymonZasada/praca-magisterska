const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-3 px-4 overflow-hidden sm:px-6 lg:px-8">
        <p className="text-sm text-center text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Szymon Zasada. Wszystkie prawa
          zastrzeżone.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
