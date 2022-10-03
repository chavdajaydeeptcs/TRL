import { surveyQuestion } from './../../../interfaces/surveyQuestion';
import { Component, OnInit, Input, Output ,EventEmitter } from "@angular/core";


@Component({
  selector: "question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() questionText: string;
  answer: boolean;

  @Output() answerEvent: EventEmitter<surveyQuestion> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  getAnswer() {
    this.answerEvent.emit({ 
      question: this.questionText,
      answer : this.answer
    });
  }

  
}
