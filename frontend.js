*---------------------------------------Frontend part----------------------------------*/
var editor = new Vue({
		        el: '#editor',
		        data: { input: '# Some docs'},
		        computed: { compiledMarkdown: function () {
		                  return marked(this.input, { sanitize: true })
		              }},
		        methods: {  update: _.debounce(function (e) {
		                  this.input = e.target.value}, 100)}
		      });
		      
var someid = new Vue({
                    el: '#someid',
                    data: {
                        loadfn: '',
                        savefn: '',
                        markdowns:[],
                    },
                    methods: {
                        loadlist(){
                            this.$http.get('http://127.0.0.1:3000/list').then((response) => {
                            
                                this.markdowns = response.data.map((item) => {
                                	return item
                                });
                            });
                        },
                        loadfile(){
                            var url = 'http://127.0.0.1:3000/load?fileName=' + this.loadfn;
                            this.$http.get(url).then((response) => {
                                editor._data.input = response.data[0].text;
                            });
                        },
                        savefile(){
                            var url = 'http://127.0.0.1:3000/save?fileName=' + this.savefn;
                            this.$http.post(url, {
                                content: editor._data.input
                            }).then((response) => {
                                //doing something
                            });
                        }
                    }
                });
				
