<template>
  <div class="bg-josa-warm-grey pb-12">
    <h2 class="title">{{ $t('ourCommunity.title') }}</h2>
    <div class="grid grid-cols-5 grid-rows-2 gap-4 pb-8">
      <img
        v-for="i in 10"
        :key="i"
        class="thumbs"
        src="~/static/instagram-feed/4.jpg"
        alt=""
      />
    </div>
    <div class="pb-8">
      <p>
        <strong>{{ $t('ourCommunity.text1') }}</strong>
      </p>
      <p>{{ $t('ourCommunity.text2') }}</p>
    </div>
    <div class="flex flex-wrap justify-between">
      <nuxt-link class="mb-4 button button-blue-full" to="#">{{
        $t('button.membersHub')
      }}</nuxt-link>
      <nuxt-link class="mb-4 button button-blue" to="#">{{
        $t('button.login')
      }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurCommunity',
}
</script>
