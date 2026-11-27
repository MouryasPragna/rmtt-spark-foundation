export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDocument = {
  /** True until the client (or their legal adviser) approves the text; the page shows a draft notice. */
  draft: boolean;
  lastUpdated: string;
  sections: LegalSection[];
};

/*
 * DRAFT for client and legal review. Written only from what this website actually does today:
 * an enquiry form that opens the visitor's own email app (nothing is sent until they press Send),
 * no cookies, no analytics or advertising trackers, fonts served from the site itself, and links
 * to WhatsApp, Google Maps and LinkedIn. Structured to cover the notice items in Rule 3 of the
 * Digital Personal Data Protection Rules, 2025 and the contact requirement in Rule 9.
 * Items marked [To confirm] need the client's answer before the draft flag is removed.
 */

export const privacy: LegalDocument = {
  draft: true,
  lastUpdated: '27 November 2026',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'This website is run by Riddhi Machine Tool Technology ("RMTT", "we", "us"), GNC Industrial Estate, Agara Village, Tataguni Post, Kanakapura Main Road, Bengaluru – 560082, Karnataka, India. [To confirm: registered legal name and entity type.]',
        'This notice explains what personal data we collect through this website, why we collect it and how you can exercise your rights under the Digital Personal Data Protection Act, 2023.',
      ],
    },
    {
      heading: 'What we collect',
      paragraphs: [
        'Enquiry form: your name, company, email address and, if you choose to give them, your phone or WhatsApp number, the tool type, industry, component material, machine and quantity, and the description of your application. If you want to send a drawing, you can attach it to that email yourself.',
        'Direct contact: the details you share when you email, call or message us on WhatsApp.',
        'Technical data: like any website, our hosting provider processes your IP address and basic browser information in server logs so the site can be delivered and protected from misuse.',
        'We do not use cookies, analytics, advertising or tracking tools on this website, and the fonts are served from our own site rather than a third-party service.',
      ],
    },
    {
      heading: 'How the enquiry form works',
      paragraphs: [
        'When you press "Enquire now", the form opens your own email app with your enquiry filled in. Nothing is sent to us until you press Send in your email app; the message then arrives in our mailbox at sales@rmtt.co.in.',
      ],
    },
    {
      heading: 'Why we use your data',
      paragraphs: [
        'We use your details only to respond to your enquiry: to understand your application, prepare technical proposals and quotations, arrange samples and trials, and follow up on that enquiry. If you become a customer, we also keep the records we are required to keep by law, for example for tax and accounting.',
        'We rely on the consent you give when you tick "I agree" on the enquiry form, or when you contact us directly. You can withdraw your consent at any time by writing to us; this does not affect anything we did before you withdrew it.',
        'We do not sell your personal data, and we do not send marketing messages unless you ask us to.',
      ],
    },
    {
      heading: 'Who we share it with',
      paragraphs: [
        'Your data is handled by our team and by the service providers that host our email and website, only as needed to provide those services. We disclose data to authorities only where the law requires it.',
        'Links to WhatsApp, Google Maps and LinkedIn take you to those services, which handle your data under their own privacy policies.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'We keep enquiry details for as long as we need them to deal with your enquiry and any business that follows, and then delete them, unless the law requires us to keep them longer.',
      ],
    },
    {
      heading: 'How we protect it',
      paragraphs: [
        'The website is served over an encrypted (HTTPS) connection, and access to enquiries is limited to the people who need them to respond to you. We take reasonable security measures to protect your data.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You can ask us for a summary of the personal data we hold about you, ask us to correct, complete, update or erase it, withdraw your consent, nominate a person to exercise these rights on your behalf, and raise a grievance about how we have handled your data.',
        'To do any of these, email sales@rmtt.co.in with the subject "Personal data request". [To confirm: name or designation of the person responsible for data protection queries.] We will respond within the period required by law.',
        'If you are not satisfied with our response, you can complain to the Data Protection Board of India.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This website is intended for businesses and is not directed at children. We do not knowingly collect personal data from children.',
      ],
    },
    {
      heading: 'Changes to this notice',
      paragraphs: [
        'We may update this notice when our website or the way we handle data changes. The date at the top shows when it was last updated.',
      ],
    },
  ],
};

export const terms: LegalDocument = {
  draft: true,
  lastUpdated: '27 November 2026',
  sections: [
    {
      heading: 'About these terms',
      paragraphs: [
        'These terms apply to your use of the Riddhi Machine Tool Technology ("RMTT") website. By using the website you accept them. [To confirm: registered legal name and entity type.]',
      ],
    },
    {
      heading: 'Product information',
      paragraphs: [
        'Descriptions, specifications, images and drawings on this website are general information about our range and capabilities. Pictured tools are examples, many of them made to a specific customer\'s drawing, and do not represent standard stock items.',
        'Whether a tool suits your application depends on your component, material, machine and process. The specification of any tool we supply is the one agreed in our written quotation, drawing or order confirmation.',
      ],
    },
    {
      heading: 'Enquiries and quotations',
      paragraphs: [
        'Sending an enquiry through this website does not create an order or a contract. Prices, delivery dates and commercial terms apply only when set out in a written quotation or order confirmation from RMTT.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The text, photographs, drawings, logo and design of this website belong to RMTT unless stated otherwise. You may view and print pages for your own business use, but you may not copy, publish or reuse them without our written permission.',
        'Names of machine and equipment makers (such as SAACKE, VOLLMER and WALTER) are trademarks of their owners and are used only to describe the equipment we use.',
      ],
    },
    {
      heading: 'Product catalogue',
      paragraphs: [
        'The downloadable catalogue is provided for evaluating our products. Its contents may change without notice; please confirm current details with us before ordering.',
      ],
    },
    {
      heading: 'Links to other websites',
      paragraphs: [
        'Links to other websites, such as WhatsApp, Google Maps and LinkedIn, are provided for convenience. We are not responsible for their content or their privacy practices.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'We take care to keep this website accurate and available, but it is provided "as is". To the extent permitted by law, RMTT is not liable for any loss arising from the use of, or reliance on, information on this website. Nothing in these terms limits any liability that cannot be limited by law.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of India, and the courts at Bengaluru have jurisdiction. [To confirm with the client\'s legal adviser.]',
      ],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        'We may update these terms from time to time; the date at the top shows when they were last updated. Questions about these terms can be sent to sales@rmtt.co.in.',
      ],
    },
  ],
};
