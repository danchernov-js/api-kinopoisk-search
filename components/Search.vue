<template>
<div class="search">
    <div class="search-bar">
        <div class="search-bar__input-wrap">
            <input type="text" class="search-bar__input" v-bind="term" v-on:keyup="onSearchKeyUp" />
        </div>
        <div class="search-bar__button-wrap">
            <button type="submit" class="search-bar__button" v-on:click="search">Туда</button>
        </div>
    </div>
    <div v-if="items && items.length > 0">
        <div class="items">
            <div class="movie" v-for="item in items" v-bind:key="item.id">
                <div class="movie__title">
                    <div class="movie__title-text">
                        {{ item.title }}
                    </div>
                    <div class="movie__actors-title">Актеры:</div>                    
                </div>
                <div class="movie__body">
                    <div class="movie__title-poster">
                        <img v-bind:src="item.poster" />
                    </div>
                    <div class="movie__actors">
                        <div class="movie__actor" v-for="actor in item.actors" v-bind:key="actor">
                            {{ actor }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="paging">
            <div class="paging__prev-page">
                <a href="#" v-bind:class="{ disabled: currentPage < 2 ? '#' : ''}" v-on:click.prevent="onPrevPage">Предыдущая страница</a>
            </div>
            <div>{{currentPage}} (из {{maxPages}})</div>
            <div class="paging__next-page">
                <a href="#" v-bind:class="{ disabled: currentPage != maxPages ? '' : '#'}" v-on:click.prevent="onNextPage">Следующая страница</a>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios";
export default Vue.extend({
    data() {
        return {
            term: "",
            currentPage: 1,
            maxPages: 1,
            items: []
        }
    },
    methods: {
        search() {
            this.refreshItems();
        },
        onPrevPage() {
            if (this.currentPage < 2)
                return;

            this.currentPage--;
            this.refreshItems();
        },
        onNextPage() {
            if (this.currentPage == this.maxPages)
                return;

            this.currentPage++;
            this.refreshItems();
        },
        onSearchKeyUp(event:KeyboardEvent) {
            if (event.keyCode === 13) {
                this.refreshItems();
            }
        },
        refreshItems() {
            let url = new URL("http://localhost:3000/api/movies/search");
            url.searchParams.append("term", this.term);
            url.searchParams.append("page", this.currentPage.toString());

            axios.get(url.toString())
                 .then(resp => {
                     if (resp.data.error) throw new Error("Fuck OFF");

                     this.items = resp.data.items;
                     this.maxPages = resp.data.maxPages;
                 });
        }
    }
})
</script>

<style lang="scss">
.search-bar {
  display: flex;
  &__input-wrap {
    flex-grow: 1;
  }
  &__input {
    width: 100%;
    border-radius: 6px;
    border: 1px solid;
    font-size: 24px;
    padding-left: 15px;
    padding-right: 15px;
  }
  &__button {
    background: transparent;
    border: 1px solid orange;
    border-radius: 6px;
    height: 100%;
    padding: 0 20px 0 20px;
    margin-left: 10px;

    &:hover {
      background: orange;
      color: white;
    }
  }
}
.items {
    padding: 35px 0 15px 0;
}
.movie {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid;
    border-radius: 6px;
    &:not(:last-child) {        
        margin-bottom: 20px;
    }
    &__title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    &__title-text {
        text-align: left;
        font-size: 22px;
        font-weight: 500;
    }
    &__title-poster {
        margin-top: 15px;
    }
    &__body {
        display: flex;
        justify-content: space-between;
    }
    &__actor {
        text-align: right;
    }
    &__actors-title {
        font-weight: 500;
        font-size: 18px;
        text-align: right;
    }
}
.paging {
    display: flex;
    justify-content: space-between;

    a.disabled {
        pointer-events: none;
        color: grey;
        text-decoration: none;
    }
}
</style>