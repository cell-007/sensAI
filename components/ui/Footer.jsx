const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Interview Prep. All rights reserved.<p>Created by Abhishek Gupta & Priyanshu Bhadauriya</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer