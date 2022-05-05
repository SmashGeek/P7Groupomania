<template>
  <div class="container-fluid"> 
    <div class="row">
      
          <div class="col-lg-3">
            <post class="sticky-top"/>
          </div><!-- test sidebar-->
          <div class="col-lg-6">
            <feed />
          </div><!-- test middle column -->
          <div class="col-lg-3">
            <userCard class="sticky-top"/>
          </div>
        </div>
      </div>
    
</template>

<script>
import post from '@/components/post.vue';
import feed from '@/components/feed.vue';
import userCard from '@/components/userCard.vue';

export default {
  name: 'Home',
  components: {
    userCard,
    post,
    feed,
  }
}
</script>
