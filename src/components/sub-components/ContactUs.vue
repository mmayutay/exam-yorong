<template>
    <Transition name="fade">
        <div v-if="show" class="mainContact">
            <div class="w3-card-4 about-section">
                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo.
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                    dolor
                    sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                    dolore
                    magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                    reprehenderit qui in
                    ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
                    voluptas
                    nulla pariatur?"</p>
            </div>

            <div class="contactRow">

                <div class="contactColumn">
                    <div class="w3-card-4 card">

                        <header class="w3-container w3-light-grey">
                            <h3>Raymond Jay Yorong</h3>
                        </header>

                        <div class="w3-container">
                            <hr>
                            <img src="../../assets/yorong.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right">
                            <p>"You don't win a war by fighting each other, you win a war by fighting together."</p><br><br>
                            <p><b> - Daniel John Ford Padilla</b></p>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="contactColumn">
                </div>
            </div><br>

            <div class="contactRow">
                <div class="contactColumn">
                </div>

                <div v-if="show" class="contactColumn">
                    <div class="w3-card-4 card">
                        <header class="w3-container w3-light-grey">
                            <h3>Monkey D. Luffy</h3>
                        </header>
                        <div class="w3-container">
                            <hr>
                            <img src="../../assets/luffy.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right">
                            <p>“If I give up now, I'm going to regret it.”</p><br><br>
                            <p><b> - Monkey D. Luffy</b></p>
                            <br>
                        </div>
                    </div>
                </div>

            </div>

            <div class="contactRow">

                <div v-if="show" class="contactColumn">
                    <div class="w3-card-4 card">
                        <header class="w3-container w3-light-grey">
                            <h3>Roronoa Zoro</h3>
                        </header>
                        <div class="w3-container">
                            <hr>
                            <img src="../../assets/zoro.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right">
                            <p>“In a real fight there is no man or woman! If you don't fight with your real power,
                                that
                                will be the most shameful thing.”</p><br><br>
                            <p><b> - Roronoa Zoro</b></p>
                            <br>
                        </div>
                    </div>
                </div>

                <div class="contactColumn">
                </div>
            </div>

            <div class="contactRow">
                <div class="contactColumn">
                </div>

                <div v-if="show" class="contactColumn">
                    <div class="w3-card-4 card">
                        <header class="w3-container w3-light-grey">
                            <h3>Vinsmoke Sanji</h3>
                        </header>
                        <div class="w3-container">
                            <hr>
                            <img src="../../assets/sanji.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right">
                            <p>“Men who can't wipe away the tears from a women's eyes, aren't real men.”</p><br><br>
                            <p><b> - Vinsmoke Sanji</b></p>
                            <br>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Transition>


</template>


<script>

export default {
    data() {
        return {
            show: false,
            showModalButton: false
        }
    },

    mounted() {
        this.show = true;
    },

    methods: {
        showButtons() {
            // if(this.showModalButton) {
            //     this.showModalButton = false;
            // }else {
            //     this.showModalButton = true;
            // }
            // console.log(this.showModalButton)
        }
    }
}


</script>

<style>
.mainContact {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

* {
    box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.contactColumn {
    float: left;
    width: 50%;
    padding: 10px;
    /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.contactRow:after {
    content: "";
    display: table;
    clear: both;
}

img {
    margin-bottom: 20px;
    width: 25%;
}

.card {
    border-radius: 5px;
    transition: ease 0.3s;
}

.card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.card img {
    transition: ease 0.3s;
}

.card:hover img {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
}

.about-section {
    padding: 50px;
    text-align: center;
    background-color: rgba(172, 172, 172, 0.5);

}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
