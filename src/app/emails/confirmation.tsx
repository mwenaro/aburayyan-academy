import * as React from 'react'

import {
  Html,
  Head,
  Text,
  Link,
  Tailwind,
  Body,
  Container,
  Section,
  Img,
} from "@react-email/components";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";

const ConfirmationEmail = ({
  logo,
  name,
  link,
}: {
  logo?: string;
  name?: string;
  link?: { label: string; href: string };
}) => (
  <Html lang="en">
    <Head />
    <Tailwind>
      <Body className="pt-[5%] font-sans bg-blue-500 w-full mx-auto text-center">
        <Container className="max-w-[600px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
          <Section className="p-5 border-b border-gray-200">
            {logo ? (
              <Img
                src="your-logo.png"
                alt="Logo"
                className="block mx-auto w-[27%]"
              />
            ) : (
              <LogOutIcon />
            )}
          </Section>
          <Section className="p-8">
            <Text className="text-2xl mb-2.5">Thank You for Your Message!</Text>
            <Text className="text-base leading-6">
              Thank you for reaching out! Your message has been received, and
              I&apos;ll get back to you as soon as possible.
            </Text>
            <Text className="text-sm leading-none">
              Best regards,
              <strong className="block my-3">
                {name ? name : "Mwero Abdalla"}
              </strong>
            </Text>
          </Section>
          <Section className="p-4 border-t border-gray-200 text-xs text-gray-600">
            <Text className="leading-none">
              Visit my website:{" "}
              <Link
                href={link?.href ? link.href : `https://mwero.me`}
                className="text-blue-500"
              >
                {link?.label ? link.label : "mwero.me"}
              </Link>
            </Text>
            <Text>
              <EnvelopeClosedIcon className="inline-block mr-1 text-blue-500" />
              Email:{" "}
              <Link
                href="mailto:mweroabdalla@gmail.com"
                className="text-blue-500"
              >
                mweroabdalla@gmail.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ConfirmationEmail;
