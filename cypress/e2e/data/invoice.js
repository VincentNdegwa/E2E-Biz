const Invoice = {
  lpo_number: "LPO12345",
  delivery_note_number: "DN6789",
  note: "Thank you for trying automation.",
  terms_and_conditions: "This is an automated invoice",
};

const InvoiceUpdate = {
  lpo_number: "LPO54321",
  delivery_note_number: "DN9876",
  note: "This is the update of the note",
  terms_and_conditions: "This is the update automated t/c",
};

module.exports = { Invoice, InvoiceUpdate };
