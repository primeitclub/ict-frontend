export default function ContactPage() {
  return (
    <div className="p-page-margin">
      <h1 className="text-4xl font-bold text-primary mb-6">Contact Us</h1>
      <p className="text-secondary mb-8">
        Have questions? Reach out to us using the form below.
      </p>
      <form className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full bg-secondary border-none rounded-md px-4 py-2 text-primary focus:ring-2 focus:ring-accent-light"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-secondary border-none rounded-md px-4 py-2 text-primary focus:ring-2 focus:ring-accent-light"
          />
        </div>
        <button type="submit" className="btn-primary w-full mt-4">
          Send Message
        </button>
      </form>
    </div>
  );
}
