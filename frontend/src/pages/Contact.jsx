import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="marcellus-regular font-bold text-xl text-gray-600">
            Contact
          </p>
          <p className="marcellus-regular text-gray-500">
            Tel: (437) 484-7007 <br /> Email: lumeneracards@gmail.com
          </p>
        </div>
      </div>

      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"OUR"} text2={"POLICY"} />
      </div>
      <div className="my-10 px-6 md:px-12 text-gray-500">
        <p className="marcellus-regular">
          At Lumenera Cards, we strive to provide a seamless and transparent
          shopping experience for our valued customers. Upon purchasing any
          item, customers will receive an email containing the details of their
          purchase and delivery information shortly after the transaction is
          completed. Please note that it is strictly prohibited to replicate,
          reproduce, or distribute our products without prior authorization, as
          doing so violates copyright laws and will be pursued legally.
          Additionally, we maintain a comprehensive record of all user accounts
          and their associated policies to ensure compliance and protect our
          intellectual property. Refunds are not offered under any
          circumstances; all sales are final. For any issues, assistance, or
          inquiries, please contact us via the provided email:
          lumeneracards@gmail.com. Our policies are designed to protect both our
          business and our customers. Any attempt to manipulate or exploit the
          system will result in immediate account suspension. Shipping times may
          vary depending on location, and delays are not grounds for
          cancellation. By using our service, customers agree to adhere to these
          terms and any updates that may be published on our website. All
          personal information is stored securely and will not be shared with
          third parties except as required by law. We reserve the right to
          modify our policies at any time without prior notice. Thank you for
          your understanding and support of Lumenera Cards.
        </p>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
