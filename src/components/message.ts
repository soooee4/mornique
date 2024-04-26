interface Message {
  [key: string]: string;
}

const message: Message = {
  ASK_TASK_NAME: "What's your plan for this morning?",
  LOGO_TEXT: "Let's make your",
  LOGO: "mornique",
  ERROR_EMPTY_TASK_NAME: "Don't forget to add a task name! 😉",
  ERROR_EMPTY_TASK_TIME: "Need a time for the task. 😊",
  ERROR_VALIDATIN_TAST_TIME: "Please keep it under 30 min. 😮"
}
export default message;