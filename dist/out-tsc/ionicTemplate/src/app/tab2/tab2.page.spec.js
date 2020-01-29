import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
describe('Tab2Page', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [Tab2Page],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(Tab2Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tab2.page.spec.js.map