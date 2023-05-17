<script setup lang="ts">
import MarqueeText from 'vue-marquee-text-component'
import VideoBackground from 'vue-responsive-video-background-player'
const stringRegisterType = ref('')

const changeRegisterType = (registerType: string) => {
  stringRegisterType.value = registerType
}
</script>

<template>
  <VideoBackground
    src="assets/MineVideo.mp4"
    style="max-height: 400vh; height: 100vh"
    overlay="linear-gradient(153deg, #37332D00 0%, #66708500 0%, #667085 100%)"
  >
    <v-container pa-0 fluid>
      <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center align-center ml-auto">
        <div class="logo-text">
          <img src="../../assets/MineMatchLogo.png" alt="Logo" class="logo">
        </div>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4" class="align-items-center ml-auto">
        <v-card class="mt-4 pa-10 rounded-xl" :elevation="15" color="radial-gradient(circle, hsla(234, 10%, 20%, 1) 0%, hsla(56, 21%, 52%, 1) 100%)">
          <v-card-title class="text-center" color="#667085">
            <h5 v-if="stringRegisterType !== 'representative' && stringRegisterType !== 'vendor'" class="mb-0 text-h5">
              Login
            </h5>
            <h5 v-else-if="stringRegisterType === 'representative'" class="mb-0 text-h5">
              Register as a Representative
            </h5>
            <h5 v-else-if="stringRegisterType === 'vendor'" class="mb-0 text-h5">
              Register as a Data Requestor
            </h5>
          </v-card-title>
          <v-card-text>
            <TheLogin v-if="stringRegisterType !== 'representative' && stringRegisterType !== 'vendor'" />
            <TheRegistrationRepresentatives v-else-if="stringRegisterType === 'representative'" />
            <TheRegistrationVendors v-else-if="stringRegisterType === 'vendor'" />
            <div v-if="stringRegisterType !== 'representative' && stringRegisterType !== 'vendor'">
              <p class="text-body-1 mt-10">
                Don't have an account? Register now.
              </p>
              <v-row>
                <v-col>
                  <v-btn color="#1C658C" class="mt-4" block @click="changeRegisterType('representative')">
                    <span class="text-white">
                      Representative
                    </span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="#1C658C" class="mt-4" block @click="changeRegisterType('vendor')">
                    <span class="text-white">
                      Data Requestor
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-4" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
    <MarqueeText :duration="60" class="marquee-text-position">
      MineMatch is a platform designed to promote a greener and more sustainable mining industry by providing a marketplace for the sale of mine side stream and tailings to potential buyers. By connecting mining companies with interested parties, MineMatch facilitates the reduction of waste and promotes the circular economy by enabling the reuse of materials that might otherwise be discarded. Our goal is to make the mining industry more sustainable while simultaneously supporting businesses and communities that rely on it.
    </MarqueeText>
  </VideoBackground>
</template>

<style lang="scss" scoped>
.marquee-text-position {
        background-color: #1C658C;
        color: #FFFFFF;
        font-size: 2rem;
        position: absolute;
        bottom: 40px;
      }
</style>
