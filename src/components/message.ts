interface Message {
  [key: string]: string;
}

const message: Message = {
  ASK_TASK_NAME: "What's your morning routine?",
  LOGO_TEXT: "Let's make your",
  START_TIMER_TEXT: "Let's start your",
  LOGO: "mornique",
  ERROR_EMPTY_TASK_NAME: "Don't forget to add a task name! 😉",
  ERROR_EMPTY_TASK_TIME: "Need a time for the task. 😊",
  ERROR_VALIDATION_TASK_TIME: "Please keep it under 30 min. 😮",
  ERROR_VALIDATION_NUMBER_ONLY: "Please use the correct time format. 😊"
}
export default message;