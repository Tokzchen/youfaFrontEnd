<template>
  <div class="avatar-container">
    <div
      class="avatar"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="uploadImage"
    >
      <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" />
      <span class="tooltip" v-if="showTooltip">{{ tooltipText }}</span>
      <input type="file" ref="fileInputRef" style="display: none" @change="handleImageUpload" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const avatarSrc = ref('');
const showTooltip = ref(false);
const tooltipText = ref('点击上传图片');
const fileInputRef = ref(null);

const uploadImage = () => {
  if (!avatarSrc.value) {
    fileInputRef.value.click();
  }
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // Create a FormData object to send the file in the request payload
      const formData = new FormData();
      formData.append('avatar', file);

      // Make an HTTP POST request to upload the file
      const response = await fetch('http://fileUpload/avatar', {
        method: 'POST',
        body: formData,
      });

      console.log(response)

      if (response.ok) {
        // File uploaded successfully
        const result = await response.json();
        // Assuming the response contains the new image URL
        avatarSrc.value = result.imageUrl;
      } else {
        // Handle error if the upload failed
        console.error('File upload failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle any other errors that might occur during the upload process
      console.error('An error occurred during file upload:', error);
    }
  }
};
</script>

<style>
.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ccc;
  overflow: hidden;
  cursor: pointer;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar:hover .tooltip {
  opacity: 1;
}
</style>
