<template>
    <div class="bubble-container">
      <div
        v-for="(char, index) in text"
        :key="index"
        class="bubble text-blue-500"
        :style="{ backgroundColor: color, fontSize: fontSize + 'px', animationDelay: index * 0.1 + 's' }"
      >
        {{ char }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      color: {
        type: String,
        default: "#f0f0f0", // 默认背景色
      },
      fontSize: {
        type: Number,
        default: 24, // 默认字体大小
      },
    },
    data() {
      return {
        text: "暂时没东西",
      };
    },
  };
  </script>
  
  <style>
  .bubble-container {
    display: flex;
    align-items: center;
  }
  
  .bubble {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
    font-weight: bold;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bounce 1s infinite alternate;
  }
  
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
  </style>
  