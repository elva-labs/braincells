<template>
  <div class="quiz">
    <h3>{{ question }}</h3>
    <ul>
      <li v-for="(answer, index) in answers" :key="index">
        <button @click="checkAnswer(index)" :class="{
          correct: result !== null && index === correctAnswer,
          wrong: result !== null && index !== correctAnswer && index === selectedAnswer
        }" :disabled="result !== null && index !== correctAnswer">
          {{ answer }}
        </button>
      </li>
    </ul>
    <p v-if="result !== null" class="hint">
      {{ result }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    correctAnswer: {
      type: Number,
      required: true
    },
    answerInfo: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      selectedAnswer: null,
      result: null
    };
  },
  methods: {
    checkAnswer(index) {
      this.selectedAnswer = index;
      if (index === this.correctAnswer) {
        this.result = this.answerInfo[index] || "Correct!";
      } else {
        this.result = this.answerInfo[index] || "Wrong answer, try again.";
      }
    }
  }
};
</script>

<style scoped>
.quiz {
  font-family: var(--vp-font-family-base);
  margin: 20px 0;
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
  border-color: var(--vp-button-brand-border);
  color: #1b1b1f;
  font-weight: 400;
  background-color: var(--vp-button-brand-bg);
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  transition: background-color 0.3s, border-color 0.3s;
}

.quiz button:hover {
  border-color: var(--vp-button-brand-hover-border);
  background-color: var(--vp-button-brand-hover-bg);
}

.quiz button.correct {
  background-color: var(--vp-c-green-3);
  color: rgba(255, 255, 245, 0.86);
}

.quiz button.wrong {
  background-color: var(--vp-c-red-3);
  color: rgba(255, 255, 245, 0.86);
}

.quiz button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.hint {
  border-color: var(--vp-custom-block-details-border);
  color: var(--vp-custom-block-details-text);
  background-color: var(--vp-custom-block-details-bg);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 16px;
  line-height: 24px;
  font-size: var(--vp-custom-block-font-size);
  overflow-wrap: break-word;
}
</style>
