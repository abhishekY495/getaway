import MessageBubble from "@/components/message-bubble";
import { useChatMessage } from "@/lib/hooks/chat/use-chat-message";
import { SendIcon } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import {
  KeyboardChatScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";

type ChatMessage = {
  message: string;
  isUser: boolean;
  isError?: boolean;
};

export default function AiChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [interactionId, setInteractionId] = useState<string | undefined>();
  const chatMutation = useChatMessage();

  const handleSend = () => {
    const trimmedMessage = input.trim();
    if (!trimmedMessage || chatMutation.isPending) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        message: trimmedMessage,
        isUser: true,
      },
    ]);
    setInput("");

    chatMutation.mutate(
      {
        message: trimmedMessage,
        previousInteractionId: interactionId,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setInteractionId(data.interactionId);
          setMessages((prev) => [
            ...prev,
            {
              message: data.message,
              isUser: false,
            },
          ]);
        },
        onError: (err) => {
          console.log(err);
          setMessages((prev) => [
            ...prev,
            {
              message: "Something went wrong. Try to send the message again.",
              isUser: false,
              isError: true,
            },
          ]);
        },
      },
    );

    Keyboard.dismiss();
  };

  const handleReset = () => {
    setMessages([]);
    setInteractionId(undefined);
    setInput("");
    chatMutation.reset();
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 bg-white px-3 pb-4">
      <View className="flex-row justify-between items-center mb-3 border-b border-neutral-200 pb-2">
        <Text className="font-black text-3xl">🤵🏻‍♂️ AI Concierge</Text>
        <Pressable
          onPress={handleReset}
          disabled={chatMutation.isPending}
          className="bg-neutral-800 px-3 py-2 rounded-lg"
        >
          <Text className="text-white text-sm font-semibold">Reset</Text>
        </Pressable>
      </View>
      <KeyboardChatScrollView
        className="flex-1 pb-3"
        keyboardLiftBehavior="whenAtEnd"
      >
        {messages &&
          messages.map((message, id) => {
            return (
              <MessageBubble
                key={id}
                message={message.message}
                isUser={message.isUser}
                isError={message.isError}
              />
            );
          })}
        {chatMutation.isPending && (
          <View className="bg-neutral-200 border border-neutral-400 self-start py-2 px-3 rounded-xl mb-4">
            <ActivityIndicator className="text-neutral-500" />
          </View>
        )}
      </KeyboardChatScrollView>
      {/*  */}
      <KeyboardStickyView
        offset={{ opened: 111, closed: 7 }}
        className="flex-row gap-2 items-center py-2 bg-white"
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about events, your bookings and more..."
          className="flex-1 border border-neutral-300 px-3 rounded-lg placeholder:text-neutral-400"
          returnKeyType="send"
        />
        <Pressable
          onPress={handleSend}
          disabled={!input.trim() || chatMutation.isPending}
          className="bg-black p-3 rounded-lg disabled:opacity-50"
        >
          <SendIcon size={18} color="#d4d4d4" />
        </Pressable>
      </KeyboardStickyView>
    </View>
  );
}
