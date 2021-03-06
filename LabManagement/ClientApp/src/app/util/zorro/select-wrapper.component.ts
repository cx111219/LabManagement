// ============== NgZorro下拉列表包装器===================
// Copyright 2019 何镇汐
// Licensed under the MIT license
// =======================================================
import { Component, Input, Output, EventEmitter, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControlWrapperBase } from './base/form-control-wrapper-base';
import { SelectList, SelectItem, SelectOption, SelectOptionGroup } from "../core/select-model";
import { Util as util } from "../util";
import { QueryParameter } from "../core/model";

/**
 * NgZorro下拉列表包装器
 */
@Component( {
    selector: 'x-select',
    template: `
        <nz-form-control [nzValidateStatus]="(controlModel?.hasError( 'required' ) && (controlModel?.dirty || controlModel.touched))?'error':'success'">
            <nz-select #controlModel="ngModel" [name]="name" [ngModel]="model" (ngModelChange)="onModelChange($event)"
                [nzPlaceHolder]="placeholder" [ngStyle]="getStyle()" [nzLoading]="loading"
                [nzMode]="getMode()" [nzMaxMultipleCount]="maxMultipleCount"
                [nzShowSearch]="showSearch" [nzAllowClear]="allowClear" [nzShowArrow]="showArrow"
                [nzDisabled]="disabled" [required]="required" [nzServerSearch]="isServerSearch"
                (nzBlur)="handleBlur($event)" (nzFocus)="handleFocus($event)" (keyup)="handleKeyup($event)" (keydown)="handleKeydown($event)"
                (nzOnSearch)="search($event)" (nzScrollToBottom)="scrollToBottom()">
                <nz-option *ngIf="defaultOptionText" [nzLabel]="defaultOptionText"></nz-option>
                <ng-container *ngIf="!isGroup">
                    <nz-option *ngFor="let item of options" [nzValue]="item.value" [nzLabel]="item.text" [nzDisabled]="item.disabled"></nz-option>
                </ng-container>
                <ng-container *ngIf="isGroup">
                    <nz-option-group *ngFor="let group of optionGroups" [nzLabel]="group.text">
                        <nz-option *ngFor="let item of group.value" [nzValue]="item.value" [nzLabel]="item.text" [nzDisabled]="item.disabled">
                        </nz-option>
                    </nz-option-group>
                </ng-container>
            </nz-select>
            <nz-form-explain *ngIf="controlModel?.hasError( 'required' ) && (controlModel?.dirty || controlModel.touched)">{{requiredMessage}}</nz-form-explain>
        </nz-form-control>
    `
} )
export class Select extends FormControlWrapperBase implements OnInit {
    /**
     * 按组显示
     */
    isGroup: boolean;
    /**
     * 列表项集合
     */
    options: SelectOption[];
    /**
     * 列表组集合
     */
    optionGroups: SelectOptionGroup[];
    /**
     * 加载状态
     */
    @Input() loading: boolean;
    /**
     * 数据源
     */
    private data: SelectItem[];
    /**
     * 数据源
     */
    @Input() get dataSource(): SelectItem[] {
        return this.data;
    }
    set dataSource( value: SelectItem[] ) {
        this.data = value;
        this.loadData();
    }
    /**
     * 请求地址
     */
    @Input() url: string;
    /**
     * 查询参数
     */
    @Input() queryParam;
    /**
     * 初始化时是否自动加载数据，默认为true,设置成false则手工加载
     */
    @Input() autoLoad: boolean;
    /**
     * 排序列
     */
    @Input() order: string;
    /**
     * 宽度
     */
    @Input() width?: string;
    /**
     * 多选
     */
    @Input() multiple: boolean;
    /**
     * 标签
     */
    @Input() tags: boolean;
    /**
     * 最多允许选中的数量
     */
    @Input() maxMultipleCount: number;
    /**
     * 默认项文本
     */
    @Input() defaultOptionText: string;
    /**
     * 显示清空按钮
     */
    @Input() allowClear: boolean;
    /**
     * 显示搜索框
     */
    @Input() showSearch: boolean;
    /**
     * 显示箭头
     */
    @Input() showArrow: boolean;
    /**
     * 服务端搜索
     */
    @Input() isServerSearch: boolean;
    /**
     * 下拉加载
     */
    @Input() isScrollLoad: boolean;
    /**
     * 搜索事件
     */
    @Output() onSearch = new EventEmitter<string>();
    /**
     * 滚动到底部事件
     */
    @Output() onScrollToBottom = new EventEmitter<void>();

    @Output() onChange = new EventEmitter<any>();

    /**
     * 初始化下拉列表包装器
     */
    constructor( @Optional() form: NgForm ) {
        super( form );
        this.queryParam = new QueryParameter();
        this.allowClear = true;
        this.showSearch = true;
        this.showArrow = true;
        this.autoLoad = true;
        this.loading = false;
        this.maxMultipleCount = 9999;
    }

    /**
     * 组件初始化
     */
    ngOnInit() {
        this.initPageSize();
        this.initOrder();
        this.loadData();
        if ( this.dataSource )
            return;
        if ( this.autoLoad )
            this.loadUrl();
    }

    /**
     * 初始化分页大小
     */
    private initPageSize() {
        if ( this.isScrollLoad )
            return;
        this.queryParam.pageSize = 9999;
    }

    /**
     * 初始化排序
     */
    private initOrder() {
        if ( !this.order )
            return;
        this.queryParam.order = this.order;
    }

    /**
     * 加载数据
     * @param data 列表项集合
     */
    loadData( data?: SelectItem[] ) {
        this.data = data || this.data;
        if ( !this.data )
            return;
        let select = new SelectList( this.data );
        if ( select.isGroup() ) {
            this.isGroup = true;
            this.optionGroups = select.toGroups();
            return;
        }
        this.isGroup = false;
        this.options = select.toOptions();
    }

    /**
     * 从服务器加载
     */
    loadUrl( options?: {
        /**
         * 请求地址
         */
        url?: string,
        /**
         * 查询参数
         */
        param?,
        /**
         * 成功加载回调函数
         */
        handler?: ( value ) => void;
    } ) {
        options = options || {};
        let url = options.url || this.url;
        if ( !url )
            return;
        let param = options.param || this.queryParam;
        util.webapi.get<SelectItem[]>( url ).param( param ).handle( {
            before: () => {
                this.loading = true;
                return true;
            },
            ok: result => {
                if ( options.handler ) {
                    options.handler( result );
                    return;
                }
                this.loadData( result );
            },
            complete: () => this.loading = false
        } );
    }

    /**
     * 获取样式
     */
    getStyle() {
        return {
            'width': this.width ? this.width : null
        };
    }

    /**
     * 获取模式
     */
    getMode() {
        if ( this.tags )
            return 'tags';
        return this.multiple ? 'multiple' : 'default';
    }

    /**
     * 搜索
     * @param value 值
     */
    search( value: string ) {
        this.onSearch.emit( value );
        if ( this.isServerSearch )
            this.serverSearch( value );
    }

    /**
     * 服务端搜索
     */
    private serverSearch( value: string ) {
        this.queryParam.page = 1;
        this.queryParam.keyword = value;
        this.loadUrl();
    }

    /**
     * 滚动到底部
     */
    scrollToBottom() {
        this.onScrollToBottom.emit();
        if ( this.isScrollLoad )
            this.scrollLoad();
    }

    /**
     * 下拉加载
     */
    private scrollLoad() {
        this.queryParam.page = util.helper.toNumber( this.queryParam.page ) + 1;
        this.loadUrl( {
            handler: result => {
                if ( !result || result.length === 0 ) {
                    this.isScrollLoad = false;
                    return;
                }
                let data = [...this.data, ...result];
                this.loadData( data );
            }
        } );
    }

    /**
     * 模型变更事件处理
     */
    onModelChange( value ) {
        this.modelChange.emit( value );
        let result = this.data.find( t => t.value === value );
        if ( result ) {
            this.onChange.emit( result );
            return;
        }
        this.onChange.emit( value );
    }
}
