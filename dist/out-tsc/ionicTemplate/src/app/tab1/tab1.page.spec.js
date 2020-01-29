import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Tab1Page } from './tab1.page';
describe('Tab1Page', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [Tab1Page],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(Tab1Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tab1.page.spec.js.map