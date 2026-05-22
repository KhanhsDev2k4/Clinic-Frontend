// components/Chat/MessagePanel/MessageInput.tsx
"use client";

import React, { useRef } from "react";
import { FormikHelpers, useFormik } from "formik";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MESSAGE_INPUT_MAX_LENGTH } from "@/components/Chat/config";
import { MessageFormValues, messageSchema } from "@/components/Chat/MessagePanel/config";
import { usePatientMessageCreate } from "@/hooks/patient/usePatientMessageList";
import { useDataConversation } from "@/components/Chat/hook";
import { MESSAGE_TYPE } from "@/common";
import { useChatActions } from "@/hooks/useChatActions";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";

const TYPING_STOP_DELAY = 2000;

interface MessageInputProps {
  disabled?: boolean;
}

function MessageInput({ disabled }: MessageInputProps) {
  const { activeConversation } = useDataConversation();
  const conversationId = activeConversation?.id ?? "";

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false); // tránh gửi duplicate

  const patientMessageCreate = usePatientMessageCreate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendTyping, sendMessage } = useChatActions();

  const startTyping = () => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      sendTyping(conversationId, true);
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(stopTyping, TYPING_STOP_DELAY);
  };

  const stopTyping = () => {
    if (!isTypingRef.current) return;
    isTypingRef.current = false;
    sendTyping(conversationId, false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const { data } = useCurrentProfile();

  const initialValues = useRef<MessageFormValues>({ content: "" });

  const onSubmit = async (values: MessageFormValues, helpers: FormikHelpers<MessageFormValues>) => {
    stopTyping();
    // await patientMessageCreate.trigger({
    //   conversationId,
    //   content: values.content.trim(),
    //   type: MESSAGE_TYPE.TEXT,
    //   replyTo: null,
    // });
    const payload = {
      senderId: data?.body?.patient?.id ?? data?.body?.doctor?.id,
      conversationId,
      content: values.content.trim(),
      type: MESSAGE_TYPE.TEXT,
    };

    sendMessage(conversationId, payload);

    helpers.resetForm();
    textareaRef.current?.focus();
  };

  const formik = useFormik<MessageFormValues>({
    initialValues: initialValues.current,
    validationSchema: messageSchema,
    onSubmit,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.handleChange(e);
    if (e.target.value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formik.submitForm();
    }
  };

  const canSend = formik.values.content.trim().length > 0 && !formik.isSubmitting && !disabled;

  return (
    <div className="border-t bg-background px-4 py-3 shrink-0">
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          name="content"
          placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
          className={cn("resize-none text-sm min-h-10 max-h-32 flex-1 py-2.5", "scrollbar-thin")}
          rows={1}
          value={formik.values.content}
          onChange={handleChange} // ← dùng handleChange mới
          onKeyDown={handleKeyDown}
          disabled={disabled || formik.isSubmitting}
          maxLength={MESSAGE_INPUT_MAX_LENGTH}
        />
        <Button
          size="icon"
          className="h-10 w-10 shrink-0"
          disabled={!canSend}
          onClick={() => formik.submitForm()}
          type="button"
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
