export default function SocialMedia() {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <a
        href="https://linkedin.com"
        target="_blank"
        className="text-indigo-500"
      >
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com" target="_blank" className="text-indigo-500">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://twitter.com" target="_blank" className="text-indigo-500">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
  );
}
