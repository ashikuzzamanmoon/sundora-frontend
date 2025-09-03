const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Sundora. All Rights Reserved.</p>
        <p>A project built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;