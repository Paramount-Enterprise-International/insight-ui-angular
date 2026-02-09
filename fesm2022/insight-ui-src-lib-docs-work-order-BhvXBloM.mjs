import * as i0 from '@angular/core';
import { inject, Component, ViewChild } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as i1 from '@insight/ui';
import { IDialogRef, I_DIALOG_DATA, IUI, IDialogService, IAlertService, IGridDataSource } from '@insight/ui';
import { of } from 'rxjs';

class LocationTable {
    dialogRef = inject(IDialogRef);
    dialogData = inject(I_DIALOG_DATA);
    treeData = [
        {
            id: 1,
            name: 'APARTEMEN BEVERLY',
            status: 'Active',
            type: 'Apartment',
            location: 'Jakarta',
            children: [],
        },
        {
            id: 2,
            name: 'ATRIA MAGELANG',
            status: 'Active',
            type: 'Hotel',
            location: 'Magelang',
            children: [],
        },
        {
            id: 3,
            name: 'ATRIA MALANG',
            status: 'Active',
            type: 'Hotel',
            location: 'Malang',
            children: [],
        },
        {
            id: 4,
            name: 'ATRIA RESIDENCE',
            status: 'Active',
            type: 'Residence',
            location: 'Jakarta',
            children: [
                {
                    id: 41,
                    name: 'ATRIA RESIDENCE - Basement',
                    status: 'Active',
                    type: 'Floor',
                    location: 'Basement',
                    children: [
                        {
                            id: 411,
                            name: 'ATRIA RESIDENCE - Basement - Human Capital',
                            status: 'Active',
                            type: 'Department',
                            location: 'Basement',
                            children: [],
                        },
                        {
                            id: 412,
                            name: 'ATRIA RESIDENCE - Basement - Employee Locker',
                            status: 'Active',
                            type: 'Facility',
                            location: 'Basement',
                            children: [],
                        },
                        {
                            id: 413,
                            name: 'ATRIA RESIDENCE - Basement - Engineering',
                            status: 'Active',
                            type: 'Department',
                            location: 'Basement',
                            children: [],
                        },
                        {
                            id: 414,
                            name: 'ATRIA RESIDENCE - Basement - Housekeeping',
                            status: 'Active',
                            type: 'Department',
                            location: 'Basement',
                            children: [],
                        },
                        {
                            id: 415,
                            name: 'ATRIA RESIDENCE - Basement - Ruang Accounting',
                            status: 'Active',
                            type: 'Department',
                            location: 'Basement',
                            children: [],
                        },
                    ],
                },
                {
                    id: 42,
                    name: 'ATRIA RESIDENCE - GF - R. Accounting',
                    status: 'Active',
                    type: 'Room',
                    location: 'Ground Floor',
                    children: [],
                },
                {
                    id: 43,
                    name: 'ATRIA RESIDENCE - Ground - Bianco',
                    status: 'Active',
                    type: 'Restaurant',
                    location: 'Ground Floor',
                    children: [],
                },
            ],
        },
    ];
    selectedLocationData;
    selectedIds = [];
    selectedNames = [];
    expandedKeys = [];
    preparedTreeData = [];
    selectedObjects = [];
    ngOnInit() {
        console.log(this.dialogData);
        this.onSelectionChange(this.dialogData);
    }
    onSelectionChange(event) {
        console.log('Selection changed:', event);
        this.selectedLocationData = event;
    }
    onSave() {
        this.dialogRef.close({
            success: true,
            message: 'Request created successfully',
            data: this.selectedLocationData,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: LocationTable, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: LocationTable, isStandalone: true, selector: "ir-location-table", ngImport: i0, template: "<i-dialog title=\"Create Request\" (onSave)=\"onSave()\">\n  <i-section>\n    <i-section-body class=\"p-0\">\n      <i-grid\n        class=\"p-0\"\n        selectionMode=\"multiple\"\n        [dataSource]=\"treeData\"\n        [showNumberColumn]=\"true\"\n        [tree]=\"'children'\"\n        [treeInitialExpandLevel]=\"2\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n        <i-grid-column fieldName=\"name\" label=\"Name\" width=\"fill\" [freeze]=\"true\" />\n      </i-grid>\n    </i-section-body>\n  </i-section>\n</i-dialog>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: i1.IDialog, selector: "i-dialog", inputs: ["title", "actions"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }, { kind: "component", type: i1.IGrid, selector: "i-grid", inputs: ["dataSource", "selectionMode", "tree", "treeIndent", "treeColumn", "treeInitialExpandLevel", "showNumberColumn"], outputs: ["onSelectionChange", "onRowClick", "onRowExpandChange", "onExpandedRowsChange"], exportAs: ["iGrid"] }, { kind: "component", type: i1.IGridColumn, selector: "i-grid-column", inputs: ["fieldName", "title", "sortable", "resizable", "width", "freeze"] }, { kind: "component", type: i1.ISection, selector: "i-section" }, { kind: "component", type: i1.ISectionBody, selector: "i-section-body" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: LocationTable, decorators: [{
            type: Component,
            args: [{ selector: 'ir-location-table', imports: [IUI], template: "<i-dialog title=\"Create Request\" (onSave)=\"onSave()\">\n  <i-section>\n    <i-section-body class=\"p-0\">\n      <i-grid\n        class=\"p-0\"\n        selectionMode=\"multiple\"\n        [dataSource]=\"treeData\"\n        [showNumberColumn]=\"true\"\n        [tree]=\"'children'\"\n        [treeInitialExpandLevel]=\"2\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n        <i-grid-column fieldName=\"name\" label=\"Name\" width=\"fill\" [freeze]=\"true\" />\n      </i-grid>\n    </i-section-body>\n  </i-section>\n</i-dialog>\n" }]
        }] });

class CreateRequest {
    myForm;
    dialogRef = inject(IDialogRef);
    FormBuilder = inject(FormBuilder);
    titleFormControl = new FormControl('', [Validators.required]);
    divisionFormControl = new FormControl('', [Validators.required]);
    locationFormControl = new FormControl('', [Validators.required]);
    sendEmailFormControl = new FormControl('', [Validators.required]);
    descriptionFormControl = new FormControl('', [Validators.required]);
    woFormGroup = this.FormBuilder.group({
        titleFormControl: this.titleFormControl,
        divisionFormControl: this.divisionFormControl,
        locationFormControl: this.locationFormControl,
        sendEmailFormControl: this.sendEmailFormControl,
        descriptionFormControl: this.descriptionFormControl,
    });
    dialog = inject(IDialogService);
    selectedValue = null;
    rows = [
        { userId: 1, userName: 'Roni', employeeCode: 'PL1378' },
        { userId: 2, userName: 'Irwan', employeeCode: 'PL1234' },
        { userId: 3, userName: 'Ronway', employeeCode: 'PL2345' },
    ];
    rows$ = of(this.rows);
    divisions = [
        { id: 1, divionName: 'IT' },
        { id: 2, divionName: 'GA' },
        { id: 3, divionName: 'Sales' },
    ];
    divisions$ = of(this.divisions);
    onOptionSelected(e) {
        console.log('Selected row:', e.value);
        this.sendEmailFormControl.setValue(JSON.stringify(e.value));
    }
    onOptionSelectedDivision(e) {
        console.log('select division', e.value);
        this.divisionFormControl.setValue(JSON.stringify(e.value));
    }
    inputAddonClick = () => {
        console.log('Button clicked');
        this.openDialog();
    };
    openDialog = () => {
        const currentValue = this.locationFormControl.value;
        const selectedNames = currentValue
            ? currentValue.split(',').map((name) => name.trim())
            : [];
        const locationDialogRef = this.dialog.open(LocationTable, {
            width: '850px',
            data: selectedNames,
        });
        locationDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('Selected array:', result.data.selected);
                const firstItem = result.data.selected
                    .map((x) => x.name)
                    .join(', ');
                console.log(firstItem, 'firstItem');
                this.locationFormControl.setValue(firstItem);
            }
        });
    };
    onSave() {
        console.log('onSave Clicked');
        this.myForm.onSubmit(new Event('submit'));
        this.saveToLocalStorage();
        this.dialogRef.close(true);
    }
    getExistingDataFromLocalStorage() {
        try {
            const dataLocal = localStorage.getItem('request_data');
            if (dataLocal) {
                return JSON.parse(dataLocal);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    saveToLocalStorage() {
        try {
            const existingData = this.getExistingDataFromLocalStorage();
            const createData = this.createNewRequest();
            const saveDatatoLocalStorage = [...existingData, createData];
            localStorage.setItem('request_data', JSON.stringify(saveDatatoLocalStorage));
        }
        catch (error) {
            console.error(error);
        }
    }
    createNewRequest() {
        const existingData = this.getExistingDataFromLocalStorage();
        const newId = existingData.length > 0
            ? Math.max(...existingData.map((item) => item.id)) + 1
            : 1;
        const requestCode = this.generateRequestCode(existingData.length + 1);
        const requestDate = this.getCurrentDateFormatted();
        const divisionName = this.divisionFormControl.value;
        let divisionTo = '';
        if (divisionName) {
            let parsedValue;
            if (typeof divisionName === 'string') {
                try {
                    if (divisionName.trim().startsWith('{') &&
                        divisionName.trim().endsWith('}')) {
                        parsedValue = JSON.parse(divisionName);
                        console.log('Parsed JSON:', parsedValue);
                    }
                    else {
                        divisionTo = divisionName;
                        console.log('String value (non-JSON):', divisionTo);
                    }
                }
                catch (error) {
                    divisionTo = divisionName;
                    console.log('Not a valid JSON, using as string:', divisionTo);
                    console.log(error);
                }
            }
            else if (typeof divisionName === 'object' && divisionName !== null) {
                parsedValue = divisionName;
            }
            if (parsedValue) {
                if (parsedValue.divionName) {
                    divisionTo = parsedValue.divionName;
                }
                else if (parsedValue.divisionName) {
                    divisionTo = parsedValue.divisionName;
                }
                else if (parsedValue.name) {
                    divisionTo = parsedValue.name;
                }
            }
        }
        console.log(this.sendEmailFormControl.value, 'value Name');
        return {
            id: newId,
            requestCode,
            title: this.titleFormControl.value || '',
            destination: divisionTo || 'IT',
            location: this.locationFormControl.value || 'SOHO',
            status: 'Pending',
            requestDate,
            sendEmail: this.sendEmailFormControl.value || '',
        };
    }
    generateRequestCode(sequence) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const sequenceStr = String(sequence).padStart(4, '0');
        return `REQ${year}${month}${sequenceStr}`;
    }
    getCurrentDateFormatted() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: CreateRequest, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: CreateRequest, isStandalone: true, selector: "ir-create-request", viewQueries: [{ propertyName: "myForm", first: true, predicate: ["myForm"], descendants: true }], ngImport: i0, template: "<i-dialog title=\"Create Requst\" (onOk)=\"onSave()\" (onSave)=\"onSave()\">\n  <form #myForm=\"ngForm\" class=\"w-450\" [formGroup]=\"woFormGroup\">\n    <i-fc-input formControlName=\"titleFormControl\" label=\"Title\" />\n    <i-select\n      label=\"Division\"\n      [options$]=\"divisions$\"\n      (onOptionSelected)=\"onOptionSelectedDivision($event)\"\n    />\n    <i-fc-input\n      formControlName=\"locationFormControl\"\n      label=\"Location\"\n      [append]=\"[\n        {\n          type: 'button',\n          icon: 'edit',\n          onClick: inputAddonClick,\n        },\n      ]\"\n    />\n\n    <i-select\n      label=\"Send Email\"\n      [options$]=\"rows$\"\n      [value]=\"{ userId: 1, userName: 'Tajrin', employeeCode: 'PL1378' }\"\n      (onOptionSelected)=\"onOptionSelected($event)\"\n    />\n    <!-- <i-fc-textarea\n      formControlName=\"descriptionFormControl\"\n      label=\"Description\"\n      placeholder=\"Enter your description here...\"\n    /> -->\n  </form>\n</i-dialog>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: i1.IDialog, selector: "i-dialog", inputs: ["title", "actions"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }, { kind: "component", type: i1.IFCInput, selector: "i-fc-input", inputs: ["label", "placeholder", "autocomplete", "readonly", "type", "mask", "prepend", "append", "errorMessage", "value"] }, { kind: "component", type: i1.ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: CreateRequest, decorators: [{
            type: Component,
            args: [{ selector: 'ir-create-request', imports: [IUI, FormsModule, ReactiveFormsModule], template: "<i-dialog title=\"Create Requst\" (onOk)=\"onSave()\" (onSave)=\"onSave()\">\n  <form #myForm=\"ngForm\" class=\"w-450\" [formGroup]=\"woFormGroup\">\n    <i-fc-input formControlName=\"titleFormControl\" label=\"Title\" />\n    <i-select\n      label=\"Division\"\n      [options$]=\"divisions$\"\n      (onOptionSelected)=\"onOptionSelectedDivision($event)\"\n    />\n    <i-fc-input\n      formControlName=\"locationFormControl\"\n      label=\"Location\"\n      [append]=\"[\n        {\n          type: 'button',\n          icon: 'edit',\n          onClick: inputAddonClick,\n        },\n      ]\"\n    />\n\n    <i-select\n      label=\"Send Email\"\n      [options$]=\"rows$\"\n      [value]=\"{ userId: 1, userName: 'Tajrin', employeeCode: 'PL1378' }\"\n      (onOptionSelected)=\"onOptionSelected($event)\"\n    />\n    <!-- <i-fc-textarea\n      formControlName=\"descriptionFormControl\"\n      label=\"Description\"\n      placeholder=\"Enter your description here...\"\n    /> -->\n  </form>\n</i-dialog>\n" }]
        }], propDecorators: { myForm: [{
                type: ViewChild,
                args: ['myForm']
            }] } });

class EditRequest {
    dialog = inject(IDialogService);
    FormBuilder = inject(FormBuilder);
    dialogRef = inject(IDialogRef);
    dialogData = inject(I_DIALOG_DATA);
    requestId = 0;
    selectedEmailValue = null;
    titleFormControl = new FormControl('', [Validators.required]);
    divisionFormControl = new FormControl('', [Validators.required]);
    locationFormControl = new FormControl('', [Validators.required]);
    sendEmailFormControl = new FormControl('');
    descriptionFormControl = new FormControl('');
    statusFormControl = new FormControl('Pending', [Validators.required]);
    woFormGroup = this.FormBuilder.group({
        titleFormControl: this.titleFormControl,
        divisionFormControl: this.divisionFormControl,
        locationFormControl: this.locationFormControl,
        sendEmailFormControl: this.sendEmailFormControl,
        descriptionFormControl: this.descriptionFormControl,
        statusFormControl: this.statusFormControl,
    });
    selectedUser = null;
    currentRequest = null;
    rows = [
        { userId: 2, userName: 'Roni', employeeCode: 'PL1378' },
        { userId: 3, userName: 'Irwan', employeeCode: 'PL1234' },
        { userId: 4, userName: 'Ronway', employeeCode: 'PL2345' },
    ];
    divisions = [
        { id: 1, divionName: 'IT' },
        { id: 2, divionName: 'GA' },
        { id: 3, divionName: 'Sales' },
        { id: 4, divionName: 'General Affairs' },
    ];
    divisions$ = of(this.divisions);
    rows$ = of(this.rows);
    selectedDivision;
    onOptionSelectedDivision(e) {
        console.log('Selected division object:', e.value);
        const divisionName = e.value.divionName;
        this.divisionFormControl.setValue(divisionName);
        this.selectedDivision = e.value;
        console.log('Division saved:', divisionName);
    }
    ngOnInit() {
        this.loadpopulateFormData();
        this.requestId = this.dialogData?.id || this.dialogData;
        if (this.requestId) {
            this.loadRequestData();
        }
        else {
            console.error('No ID provided for editing');
            this.dialogRef.close(false);
        }
    }
    inputAddonClick = () => {
        this.openDialog();
    };
    openDialog = () => {
        const currentValue = this.locationFormControl.value;
        const selectedNames = currentValue
            ? currentValue.split(',').map((name) => name.trim())
            : [];
        const locationDialogRef = this.dialog.open(LocationTable, {
            width: '850px',
            data: selectedNames,
        });
        locationDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('Selected array:', result.data.selected);
                const firstItem = result.data.selected
                    .map((x) => x.name)
                    .join(', ');
                console.log(firstItem, 'firstItem');
                this.locationFormControl.setValue(firstItem);
            }
        });
    };
    loadRequestData() {
        try {
            const allRequests = this.getDataFromLocalStorage();
            if (!Array.isArray(allRequests)) {
                throw new Error('Invalid data format in localStorage');
            }
            const request = allRequests.find((req) => req.id === this.requestId);
            if (request) {
                this.currentRequest = request;
            }
            else {
                this.dialogRef.close(false);
            }
        }
        catch (error) {
            console.error('Error loading request data:', error);
            this.dialogRef.close(false);
        }
    }
    loadpopulateFormData() {
        const allData = JSON.parse(localStorage.getItem('request_data') || '[]');
        const dataEdit = allData.find((x) => x.id === this.dialogData);
        if (dataEdit) {
            this.titleFormControl.setValue(dataEdit.title);
            this.divisionFormControl.setValue(dataEdit.destination);
            this.locationFormControl.setValue(dataEdit.location);
            this.descriptionFormControl.setValue(dataEdit.description || '');
            this.selectedDivision = this.divisions.find((div) => div.divionName === dataEdit.destination);
            if (dataEdit.sendEmail) {
                try {
                    const parsed = JSON.parse(dataEdit.sendEmail);
                    let userId = null;
                    if (parsed.userId) {
                        userId = parsed.userId;
                    }
                    else if (parsed.value) {
                        if (typeof parsed.value === 'string') {
                            try {
                                const inner = JSON.parse(parsed.value);
                                userId = inner.userId;
                            }
                            catch {
                                userId = parseInt(parsed.value, 10);
                            }
                        }
                        else if (typeof parsed.value === 'object') {
                            userId = parsed.value.userId;
                        }
                    }
                    if (userId) {
                        this.selectedUser =
                            this.rows.find((u) => u.userId === userId) || null;
                    }
                }
                catch (error) {
                    console.log('Bukan JSON, skip email', error);
                }
            }
        }
    }
    onOptionSelected(e) {
        console.log('Selected email option:', e);
        try {
            const selectedData = typeof e.value === 'string' ? JSON.parse(e.value) : e.value;
            this.selectedEmailValue = selectedData;
            this.sendEmailFormControl.setValue(JSON.stringify(selectedData));
        }
        catch (error) {
            console.error('Error processing selected option:', error);
            this.sendEmailFormControl.setValue(JSON.stringify(e.value));
        }
    }
    getDataFromLocalStorage() {
        try {
            const data = localStorage.getItem('request_data');
            if (data) {
                return JSON.parse(data);
            }
            return [];
        }
        catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }
    onSave() {
        console.log('Saving changes...');
        if (this.woFormGroup.invalid) {
            console.log('Form is invalid');
            this.markFormGroupTouched(this.woFormGroup);
            return;
        }
        if (!this.currentRequest) {
            console.error('No current request to update');
            return;
        }
        try {
            const updatedRequest = {
                ...this.currentRequest,
                id: this.requestId,
                title: this.titleFormControl.value || '',
                destination: this.divisionFormControl.value || this.selectedDivision,
                location: this.locationFormControl.value || '',
                status: this.statusFormControl.value || 'Pending',
                description: this.descriptionFormControl.value || '',
                sendEmail: this.sendEmailFormControl.value || this.currentRequest.sendEmail,
                requestCode: this.currentRequest.requestCode,
                requestDate: this.currentRequest.requestDate,
            };
            console.log('Updated request:', updatedRequest);
            const success = this.updateLocalStorage(updatedRequest);
            if (success) {
                console.log('Request updated successfully');
                this.dialogRef.close(true);
            }
            else {
                console.error('Failed to update request');
            }
        }
        catch (error) {
            console.error('Error saving request:', error);
        }
    }
    updateLocalStorage(updatedRequest) {
        try {
            const allData = this.getDataFromLocalStorage();
            if (!Array.isArray(allData)) {
                console.error('Invalid data format in localStorage');
                return false;
            }
            const requestIndex = allData.findIndex((req) => req.id === this.requestId);
            console.log(`Found request at index: ${requestIndex}`);
            if (requestIndex === -1) {
                console.error(`Request with ID ${this.requestId} not found`);
                return false;
            }
            allData[requestIndex] = updatedRequest;
            localStorage.setItem('request_data', JSON.stringify(allData));
            console.log('LocalStorage updated successfully');
            return true;
        }
        catch (error) {
            console.error('Error updating localStorage:', error);
            return false;
        }
    }
    markFormGroupTouched(formGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: EditRequest, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: EditRequest, isStandalone: true, selector: "ir-edit-request", ngImport: i0, template: "<i-dialog title=\"Create Requst\" (onOk)=\"onSave()\" (onSave)=\"onSave()\">\n  <form #myForm=\"ngForm\" class=\"w-450\" [formGroup]=\"woFormGroup\">\n    <i-fc-input formControlName=\"titleFormControl\" label=\"Title\" />\n    <i-select\n      label=\"Division\"\n      [options$]=\"divisions$\"\n      [value]=\"selectedDivision\"\n      (onOptionSelected)=\"onOptionSelectedDivision($event)\"\n    />\n    <i-fc-input\n      formControlName=\"locationFormControl\"\n      label=\"Location\"\n      [append]=\"[\n        {\n          type: 'button',\n          icon: 'edit',\n          onClick: inputAddonClick,\n        },\n      ]\"\n    />\n    <i-select\n      label=\"Send Email\"\n      [options$]=\"rows$\"\n      [value]=\"selectedUser\"\n      (onOptionSelected)=\"onOptionSelected($event)\"\n    />\n    <!-- <i-fc-textarea\n      formControlName=\"descriptionFormControl\"\n      label=\"Description\"\n      placeholder=\"Enter your description here...\"\n    /> -->\n  </form>\n</i-dialog>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: i1.IDialog, selector: "i-dialog", inputs: ["title", "actions"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }, { kind: "component", type: i1.IFCInput, selector: "i-fc-input", inputs: ["label", "placeholder", "autocomplete", "readonly", "type", "mask", "prepend", "append", "errorMessage", "value"] }, { kind: "component", type: i1.ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: EditRequest, decorators: [{
            type: Component,
            args: [{ selector: 'ir-edit-request', imports: [IUI, FormsModule, ReactiveFormsModule], template: "<i-dialog title=\"Create Requst\" (onOk)=\"onSave()\" (onSave)=\"onSave()\">\n  <form #myForm=\"ngForm\" class=\"w-450\" [formGroup]=\"woFormGroup\">\n    <i-fc-input formControlName=\"titleFormControl\" label=\"Title\" />\n    <i-select\n      label=\"Division\"\n      [options$]=\"divisions$\"\n      [value]=\"selectedDivision\"\n      (onOptionSelected)=\"onOptionSelectedDivision($event)\"\n    />\n    <i-fc-input\n      formControlName=\"locationFormControl\"\n      label=\"Location\"\n      [append]=\"[\n        {\n          type: 'button',\n          icon: 'edit',\n          onClick: inputAddonClick,\n        },\n      ]\"\n    />\n    <i-select\n      label=\"Send Email\"\n      [options$]=\"rows$\"\n      [value]=\"selectedUser\"\n      (onOptionSelected)=\"onOptionSelected($event)\"\n    />\n    <!-- <i-fc-textarea\n      formControlName=\"descriptionFormControl\"\n      label=\"Description\"\n      placeholder=\"Enter your description here...\"\n    /> -->\n  </form>\n</i-dialog>\n" }]
        }] });

class WorkOrder {
    formBuilder = inject(FormBuilder);
    dateFromControl = new FormControl(null);
    dateToControl = new FormControl(null);
    searchControl = new FormControl('');
    alert = inject(IAlertService);
    description = 'Saved successfully! You can view it in the "List" page.';
    descriptionEdit = 'Edit successfully! You can view it in the "List" page.';
    STORAGE_KEY = 'request_data';
    basicFormGroup = this.formBuilder.group({
        dateFrom: this.dateFromControl,
        dateTo: this.dateToControl,
        search: this.searchControl,
    });
    dialog = inject(IDialogService);
    originalData = [];
    displayedData = [];
    dataSource = new IGridDataSource([], {
        paginator: {
            pageIndex: 0,
            pageSize: 5,
            pageSizeOptions: [5, 10, 20],
        },
    });
    defaultData = [
        {
            id: 1,
            requestCode: 'REQ2026050001',
            title: 'pergantian lampu di ruang meeting lt.6 soho',
            location: 'lt.6 Soho IT',
            destination: 'General Affairs',
            status: 'Rejected',
            requestDate: '14/01/2026',
        },
    ];
    constructor() {
        this.loadDataFromStorage();
    }
    ngOnInit() {
        this.setupStorageEventListener();
        this.refreshDataSource();
    }
    setupStorageEventListener() {
        window.addEventListener('requestStorageUpdated', () => {
            console.log('Storage updated event received');
            this.loadDataFromStorage();
        });
        window.addEventListener('storage', (event) => {
            if (event.key === this.STORAGE_KEY) {
                console.log('Storage changed from another tab');
                this.loadDataFromStorage();
            }
        });
    }
    loadDataFromStorage() {
        try {
            const storage = localStorage.getItem(this.STORAGE_KEY);
            if (storage) {
                const parsedData = JSON.parse(storage);
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    this.originalData = parsedData;
                    this.displayedData = [...parsedData];
                    console.log('Data loaded from storage:', this.originalData);
                }
                else {
                    console.warn('Data di storage bukan array atau kosong, menggunakan default');
                    this.initializeDefaultData();
                }
            }
            else {
                console.log('No data in storage, initializing with default data');
                this.initializeDefaultData();
            }
        }
        catch (error) {
            console.error('Error loading from localStorage:', error);
            this.initializeDefaultData();
        }
        return this.originalData;
    }
    initializeDefaultData() {
        this.originalData = [...this.defaultData];
        this.displayedData = [...this.defaultData];
        this.saveDataStorage(this.originalData);
    }
    saveDataStorage(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            console.log('Data saved to storage:', data);
        }
        catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    updateInToLocalStorage(newData) {
        this.originalData = newData;
        this.saveDataStorage(newData);
        this.applyCurrentFilter();
    }
    deleteData(id) {
        const filterData = this.originalData.filter((x) => x.id !== id);
        this.updateInToLocalStorage(filterData);
        this.refreshDataSource();
    }
    refreshDataSource() {
        this.dataSource.data = this.displayedData;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.pageIndex = 0;
        }
    }
    showSuccessAlert() {
        this.alert
            .success('Success', this.description)
            .subscribe((result) => console.log(result));
    }
    showSuccessEditAlert() {
        this.alert
            .success('Success', this.descriptionEdit)
            .subscribe((result) => console.log(result));
    }
    createRequest() {
        const dialogRef = this.dialog.open(CreateRequest, {
            width: '550px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('Request created successfully');
                this.loadDataFromStorage();
                this.refreshDataSource();
                this.showSuccessAlert();
            }
        });
    }
    editRequest(id) {
        const locationDialogRef = this.dialog.open(EditRequest, {
            width: '550px',
            data: id,
        });
        locationDialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.loadDataFromStorage();
                this.refreshDataSource();
                this.showSuccessEditAlert();
            }
        });
    }
    applyCurrentFilter() {
        if (this.basicFormGroup.valid) {
            const formValues = this.basicFormGroup.value;
            const filteredData = this.originalData.filter((item) => {
                if (formValues.dateFrom || formValues.dateTo) {
                    const itemDateStr = item.requestDate;
                    const itemDay = parseInt(itemDateStr.split('/')[0], 10);
                    const itemMonth = parseInt(itemDateStr.split('/')[1], 10);
                    const itemYear = parseInt(itemDateStr.split('/')[2], 10);
                    const itemDateNum = itemYear * 10000 + itemMonth * 100 + itemDay;
                    if (formValues.dateFrom) {
                        const fromDate = new Date(formValues.dateFrom);
                        const fromYear = fromDate.getFullYear();
                        const fromMonth = fromDate.getMonth() + 1;
                        const fromDay = fromDate.getDate();
                        const fromDateNum = fromYear * 10000 + fromMonth * 100 + fromDay;
                        if (itemDateNum < fromDateNum)
                            return false;
                    }
                    if (formValues.dateTo) {
                        const toDate = new Date(formValues.dateTo);
                        const toYear = toDate.getFullYear();
                        const toMonth = toDate.getMonth() + 1;
                        const toDay = toDate.getDate();
                        const toDateNum = toYear * 10000 + toMonth * 100 + toDay;
                        if (itemDateNum > toDateNum)
                            return false;
                    }
                }
                if (formValues.search && formValues.search.trim() !== '') {
                    const searchLower = formValues.search.toLowerCase();
                    if (!item.title.toLowerCase().includes(searchLower) &&
                        !item.requestCode.toLowerCase().includes(searchLower)) {
                        return false;
                    }
                }
                return true;
            });
            this.displayedData = filteredData;
        }
        else {
            this.displayedData = [...this.originalData];
        }
        this.refreshDataSource();
    }
    onSubmit() {
        if (this.basicFormGroup.valid) {
            this.applyCurrentFilter();
        }
        else {
            console.log('Form invalid');
            this.displayedData = [...this.originalData];
            this.refreshDataSource();
        }
    }
    clearFilter() {
        this.dateFromControl.reset();
        this.dateToControl.reset();
        this.searchControl.reset();
        this.displayedData = [...this.originalData];
        this.refreshDataSource();
    }
    debugData() {
        console.log('Original Data:', this.originalData);
        console.log('Displayed Data:', this.displayedData);
        console.log('Local Storage:', localStorage.getItem(this.STORAGE_KEY));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: WorkOrder, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: WorkOrder, isStandalone: true, selector: "ir-work-order", ngImport: i0, template: "<i-section>\n  <i-section-header>Request List</i-section-header>\n  <i-section-filter>\n    <form\n      class=\"flex gap-md flex-fill align-center\"\n      [formGroup]=\"basicFormGroup\"\n      (ngSubmit)=\"onSubmit()\"\n    >\n      <i-fc-datepicker class=\"w-15\" formControlName=\"dateFrom\" label=\"Request Date From\" />\n      <i-fc-datepicker class=\"w-15\" formControlName=\"dateTo\" label=\"Request Date To\" />\n      <i-fc-input class=\"flex-fill\" formControlName=\"search\" label=\"Search\" />\n      <i-button icon=\"fa-solid fa-magnifying-glass\" type=\"submit\">Filter</i-button>\n    </form>\n    <i-button icon=\"add\" (onClick)=\"createRequest()\">Create Request</i-button>\n  </i-section-filter>\n  <i-section-body class=\"p-0\">\n    <i-grid [dataSource]=\"dataSource\">\n      <i-grid-column fieldName=\"requestCode\" [freeze]=\"true\" [width]=\"150\">\n        <i-grid-cell *iCellDef=\"let row\">\n          <div>\n            <p class=\"font-semibold\">{{ row.requestCode }}</p>\n            <!-- <div class=\"border border-blue-300 bg-blue-100 text-center border-xs border-rouded-sm\"> -->\n            <p class=\"text-info\">{{ row.requestDate }}</p>\n            <!-- </div> -->\n          </div>\n        </i-grid-cell>\n      </i-grid-column>\n      <i-grid-column fieldName=\"title\" title=\"Title\" [width]=\"300\" />\n      <i-grid-column fieldName=\"location\" title=\"Location\" [width]=\"260\" />\n      <i-grid-column fieldName=\"destination\" title=\"Destination Division\" [width]=\"200\" />\n      <i-grid-column fieldName=\"status\" title=\"Status\" [width]=\"150\">\n        <i-grid-cell *iCellDef=\"let row\">\n          @if (row.status === 'Pending') {\n            <!-- <div\n              class=\"status-badge flex items-centr align-center justify-center gap-2 border border-rouded-lg text-center border-xs w-11 bg-amber-100 border-amber-300\"\n             \n            > -->\n            <span class=\"text-warning\">{{ row.status }}</span>\n\n            <!-- </div> -->\n          }\n\n          @if (row.status === 'Approved') {\n            <span class=\"text-success\">{{ row.status }}</span>\n          }\n\n          @if (row.status === 'Rejected') {\n            <span class=\"text-danger\">{{ row.status }}</span>\n          }\n\n          @if (row.status === 'In Progress') {\n            <span class=\"text-info\">{{ row.status }}</span>\n          }\n        </i-grid-cell>\n      </i-grid-column>\n\n      <i-grid-custom-column title=\"Actions\" [width]=\"90\">\n        <i-grid-cell *iCellDef=\"let row\">\n          <i-button icon=\"edit\" size=\"xs\" (onClick)=\"editRequest(row.id)\" />\n\n          <i-button icon=\"delete\" size=\"xs\" (onClick)=\"deleteData(row.id)\" />\n        </i-grid-cell>\n      </i-grid-custom-column>\n    </i-grid>\n  </i-section-body>\n</i-section>\n", styles: [".border-rouded-lg{border-radius:var(--i-radius-lg)}.bg-blue-100{background-color:var(--i-color-blue-100)}.bg-amber-100{background-color:var(--i-color-amber-100)}.bg-green-100{background-color:var(--i-color-green-100)}.bg-red-100{background-color:var(--i-color-red-100)}.border-rouded-sm{border-radius:var(--i-radius-sm)}.status-wrapper{position:relative;display:inline-block}.status-wrapper:hover .tooltip-right{opacity:1;visibility:visible;transform:translateY(-50%) translate(0)}.status-badge{position:relative;display:flex;align-items:center;justify-content:center;border:1px solid #fbbf24;border-radius:.5rem;width:2.75rem;background-color:#fef3c7;cursor:help}.status-badge span{color:#d97706;font-size:.75rem;font-weight:500}.tooltip-right{position:absolute;top:50%;left:100%;transform:translateY(-50%) translate(-10px);margin-left:.5rem;z-index:999999!important;opacity:0;visibility:hidden;transition:all .2s cubic-bezier(.4,0,.2,1);pointer-events:none}.tooltip-right .tooltip-content{background:#000;color:#fff;padding:8px 12px;border-radius:6px;font-size:13px;white-space:nowrap;position:relative;box-shadow:0 4px 20px #00000040,0 0 0 1px #ffffff1a}.tooltip-right .tooltip-content:before{content:\"\";position:absolute;top:50%;right:100%;transform:translateY(-50%);border:6px solid transparent;border-right-color:#000}\n"], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: i1.IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "component", type: i1.IFCDatepicker, selector: "i-fc-datepicker", inputs: ["label", "placeholder", "format", "panelPosition", "errorMessage", "value", "_smartFocusHook"] }, { kind: "component", type: i1.IGrid, selector: "i-grid", inputs: ["dataSource", "selectionMode", "tree", "treeIndent", "treeColumn", "treeInitialExpandLevel", "showNumberColumn"], outputs: ["onSelectionChange", "onRowClick", "onRowExpandChange", "onExpandedRowsChange"], exportAs: ["iGrid"] }, { kind: "component", type: i1.IGridColumn, selector: "i-grid-column", inputs: ["fieldName", "title", "sortable", "resizable", "width", "freeze"] }, { kind: "component", type: i1.IGridCustomColumn, selector: "i-grid-custom-column", inputs: ["title", "sortable", "resizable", "width", "freeze"] }, { kind: "directive", type: i1.IGridCellDefDirective, selector: "[iCellDef]" }, { kind: "component", type: i1.IGridCell, selector: "i-grid-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: i1.IFCInput, selector: "i-fc-input", inputs: ["label", "placeholder", "autocomplete", "readonly", "type", "mask", "prepend", "append", "errorMessage", "value"] }, { kind: "component", type: i1.ISection, selector: "i-section" }, { kind: "component", type: i1.ISectionHeader, selector: "i-section-header" }, { kind: "component", type: i1.ISectionFilter, selector: "i-section-filter" }, { kind: "component", type: i1.ISectionBody, selector: "i-section-body" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: WorkOrder, decorators: [{
            type: Component,
            args: [{ selector: 'ir-work-order', imports: [IUI, FormsModule, ReactiveFormsModule], template: "<i-section>\n  <i-section-header>Request List</i-section-header>\n  <i-section-filter>\n    <form\n      class=\"flex gap-md flex-fill align-center\"\n      [formGroup]=\"basicFormGroup\"\n      (ngSubmit)=\"onSubmit()\"\n    >\n      <i-fc-datepicker class=\"w-15\" formControlName=\"dateFrom\" label=\"Request Date From\" />\n      <i-fc-datepicker class=\"w-15\" formControlName=\"dateTo\" label=\"Request Date To\" />\n      <i-fc-input class=\"flex-fill\" formControlName=\"search\" label=\"Search\" />\n      <i-button icon=\"fa-solid fa-magnifying-glass\" type=\"submit\">Filter</i-button>\n    </form>\n    <i-button icon=\"add\" (onClick)=\"createRequest()\">Create Request</i-button>\n  </i-section-filter>\n  <i-section-body class=\"p-0\">\n    <i-grid [dataSource]=\"dataSource\">\n      <i-grid-column fieldName=\"requestCode\" [freeze]=\"true\" [width]=\"150\">\n        <i-grid-cell *iCellDef=\"let row\">\n          <div>\n            <p class=\"font-semibold\">{{ row.requestCode }}</p>\n            <!-- <div class=\"border border-blue-300 bg-blue-100 text-center border-xs border-rouded-sm\"> -->\n            <p class=\"text-info\">{{ row.requestDate }}</p>\n            <!-- </div> -->\n          </div>\n        </i-grid-cell>\n      </i-grid-column>\n      <i-grid-column fieldName=\"title\" title=\"Title\" [width]=\"300\" />\n      <i-grid-column fieldName=\"location\" title=\"Location\" [width]=\"260\" />\n      <i-grid-column fieldName=\"destination\" title=\"Destination Division\" [width]=\"200\" />\n      <i-grid-column fieldName=\"status\" title=\"Status\" [width]=\"150\">\n        <i-grid-cell *iCellDef=\"let row\">\n          @if (row.status === 'Pending') {\n            <!-- <div\n              class=\"status-badge flex items-centr align-center justify-center gap-2 border border-rouded-lg text-center border-xs w-11 bg-amber-100 border-amber-300\"\n             \n            > -->\n            <span class=\"text-warning\">{{ row.status }}</span>\n\n            <!-- </div> -->\n          }\n\n          @if (row.status === 'Approved') {\n            <span class=\"text-success\">{{ row.status }}</span>\n          }\n\n          @if (row.status === 'Rejected') {\n            <span class=\"text-danger\">{{ row.status }}</span>\n          }\n\n          @if (row.status === 'In Progress') {\n            <span class=\"text-info\">{{ row.status }}</span>\n          }\n        </i-grid-cell>\n      </i-grid-column>\n\n      <i-grid-custom-column title=\"Actions\" [width]=\"90\">\n        <i-grid-cell *iCellDef=\"let row\">\n          <i-button icon=\"edit\" size=\"xs\" (onClick)=\"editRequest(row.id)\" />\n\n          <i-button icon=\"delete\" size=\"xs\" (onClick)=\"deleteData(row.id)\" />\n        </i-grid-cell>\n      </i-grid-custom-column>\n    </i-grid>\n  </i-section-body>\n</i-section>\n", styles: [".border-rouded-lg{border-radius:var(--i-radius-lg)}.bg-blue-100{background-color:var(--i-color-blue-100)}.bg-amber-100{background-color:var(--i-color-amber-100)}.bg-green-100{background-color:var(--i-color-green-100)}.bg-red-100{background-color:var(--i-color-red-100)}.border-rouded-sm{border-radius:var(--i-radius-sm)}.status-wrapper{position:relative;display:inline-block}.status-wrapper:hover .tooltip-right{opacity:1;visibility:visible;transform:translateY(-50%) translate(0)}.status-badge{position:relative;display:flex;align-items:center;justify-content:center;border:1px solid #fbbf24;border-radius:.5rem;width:2.75rem;background-color:#fef3c7;cursor:help}.status-badge span{color:#d97706;font-size:.75rem;font-weight:500}.tooltip-right{position:absolute;top:50%;left:100%;transform:translateY(-50%) translate(-10px);margin-left:.5rem;z-index:999999!important;opacity:0;visibility:hidden;transition:all .2s cubic-bezier(.4,0,.2,1);pointer-events:none}.tooltip-right .tooltip-content{background:#000;color:#fff;padding:8px 12px;border-radius:6px;font-size:13px;white-space:nowrap;position:relative;box-shadow:0 4px 20px #00000040,0 0 0 1px #ffffff1a}.tooltip-right .tooltip-content:before{content:\"\";position:absolute;top:50%;right:100%;transform:translateY(-50%);border:6px solid transparent;border-right-color:#000}\n"] }]
        }], ctorParameters: () => [] });

export { WorkOrder };
//# sourceMappingURL=insight-ui-src-lib-docs-work-order-BhvXBloM.mjs.map
