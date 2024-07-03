import {MessageEntity} from "@grammyjs/types";

export type MentionEntity = (MessageEntity.CommonMessageEntity &
    {
        type: "mention" | "text_mention" ,
        text: string
    }) |
    (MessageEntity.TextMentionMessageEntity &
        {
            type: "mention" | "text_mention"  ,
            text: string })