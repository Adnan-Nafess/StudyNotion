import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-12">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We'd love to hear from you. Please fill out this form.
      </p>
      <div className="mt-12">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
