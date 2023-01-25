import FileSaver from "file-saver";

import { surpriseMePrompts } from "../constants";

export const getRandomPrompt = (prompt) => {
  const randomPromptIndex = Math.floor(
    Math.random() * surpriseMePrompts.length
  );
  const randomPrompt = surpriseMePrompts[randomPromptIndex];
  if (randomPrompt === prompt) {
    return getRandomPrompts(prompt);
  }
  return randomPrompt;
};

export const downloadImage = async (_id, photo) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};
