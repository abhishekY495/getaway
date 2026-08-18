import { View } from "react-native";
import {
  EnrichedMarkdownText,
  MarkdownStyle,
} from "react-native-enriched-markdown";

export default function MessageBubble({
  message,
  isUser,
  isError,
}: {
  message: string;
  isUser: boolean;
  isError?: boolean;
}) {
  const markdownStyle: MarkdownStyle = {
    paragraph: {
      fontSize: 14,
      lineHeight: 22,
    },
    list: {
      fontSize: 14,
      lineHeight: 22,
    },
  };

  return (
    <View
      className={`${isError ? "bg-red-200 border border-red-500 self-start" : isUser ? "bg-blue-200 border border-blue-500 self-end" : "bg-neutral-200 border border-neutral-400 self-start"} max-w-[95%] py-1.5 px-3 pb-2 rounded-xl mb-4`}
    >
      <EnrichedMarkdownText markdown={message} markdownStyle={markdownStyle} />
    </View>
  );
}
