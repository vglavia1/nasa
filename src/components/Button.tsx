import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import { Pressable, PressableProps, Text } from "react-native";
import { colors } from "@constants";

const LinkWrapper = ({ href, children }) => (
  <Link href={href} asChild>
    {children}
  </Link>
);

const ButtonComponent = ({ onPress, text }) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: colors.jet,
      padding: 12,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: "white",
    }}
  >
    <Text style={{ textAlign: "center", color: "white" }}>{text}</Text>
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
