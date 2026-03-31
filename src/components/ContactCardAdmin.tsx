"use client";

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact;
}

const ContactCardAdmin = ({ contact }: Props) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Card.Img
        src={contact.image}
        style={{ width: '75px', height: '75px', objectFit: 'cover' }}
      />
      <div>
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer mb-0">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
