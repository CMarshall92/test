import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { Icons } from "@/components/atoms/icons";

type VerificationProps = {
  actionUrl: string;
  firstName: string;
  siteName: string;
  verificationCode?: string | null;
};

export const Verification = ({
  firstName = "",
  actionUrl,
  siteName,
  verificationCode
}: VerificationProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to {siteName}! Click the link below to activate your account.
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Icons.logo className="m-auto block size-10" />
          <Text className="text-base">Hi {firstName},</Text>
          <Text className="text-base">
            Welcome to {siteName}! Click the link below to activate your account.
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
              href={`${actionUrl}?token=${verificationCode}`}
            >
              Activate Account
            </Button>
          </Section>
          <Text className="text-base">
            {actionUrl}?code={verificationCode}
          </Text>
          <Text className="text-base">
            This link expires in 24 hours and can only be used once.
          </Text>
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">
            14 Cairns Crescent, Dunfermline, KY12 9FH, United Kingdom
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
