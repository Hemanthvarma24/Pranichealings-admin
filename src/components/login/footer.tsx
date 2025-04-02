export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-4 pb-4">
      <div className="container mx-auto px-4">
        {/* Bottom Footer */}
        <div className=" pt-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Copyright © {currentYear} Pranic Healing. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
