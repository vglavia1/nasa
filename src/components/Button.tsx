import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import { Pressable, PressableProps, Text } from "react-native";

const LinkWrapper = ({ href, children }) => (
  <Link href={href} asChild>
    {children}
  </Link>
);

const ButtonComponent = ({ onPress, text }) => (
  <Pressable
    onPress={onPress}
    style={{ backgroundColor: "white", padding: 12, borderRadius: 24 }}
  >
    <Text style={{ textAlign: "center" }}>{text}</Text>
  </Pressable>
);

type Props = {
  onPress?: PressableProps["onPress"];
  href?: LinkProps["href"];
  text: string;
};

const Button = ({ href, onPress, text }: Props) =>
  href ? (
    <LinkWrapper href={href}>
      <ButtonComponent onPress={onPress} text={text} />
    </LinkWrapper>
  ) : (
    <ButtonComponent onPress={onPress} text={text} />
  );

export default Button;
