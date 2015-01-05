KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('custom-scrollbar', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/custom-scrollbar/1.0.0/']});