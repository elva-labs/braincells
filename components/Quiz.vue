<template>
  <div class="quiz">
    <h3>{{ question }}</h3>
    <ul>
      <li v-for="(answer, index) in answers" :key="index">
        <button 
          @click="checkAnswer(index)" 
          :class="{
            correct: result !== null && index === correctAnswer,
            wrong: result !== null && index !== correctAnswer && index === selectedAnswer
          }"
          :disabled="result !== null"
        >
          {{ answer }}
        </button>
      </li>
    </ul>
    <p v-if="result !== null">{{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
      selectedAnswer: null,
      result: null
    };
  },
  methods: {
    checkAnswer(index) {
      this.selectedAnswer = index;
      if (index === this.correctAnswer) {
        this.result = "Correct!";
      } else {
        this.result = "Wrong answer, try again.";
      }
    }
  }
};
</script>

<style>
.quiz {
  margin: 20px 0;
  font-family: Arial, sans-serif;
}
.quiz h3 {
  margin-bottom: 15px;
}
.quiz ul {
  list-style-type: none;
  padding: 0;
}
.quiz li {
  margin-bottom: 10px;
}
.quiz button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}
.quiz button:hover {
  background-color: #f0f0f0;
}
.quiz button.correct {
  background-color: green;
  color: white;
  border-color: green;
}
.quiz button.wrong {
  background-color: red;
  color: white;
  border-color: red;
}
.quiz button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>

