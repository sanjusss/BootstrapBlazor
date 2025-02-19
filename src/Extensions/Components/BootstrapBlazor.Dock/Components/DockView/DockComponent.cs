﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// DockContentItem 配置项子项对标 content 配置项内部 content 配置
/// </summary>
public class DockComponent : DockComponentBase
{
    /// <summary>
    /// 获得/设置 组件名称 默认 component
    /// </summary>
    [Parameter]
    public string ComponentName { get; set; } = "component";

    /// <summary>
    /// 获得/设置 组件 Title
    /// </summary>
    [Parameter]
    public string? Title { get; set; }

    /// <summary>
    /// 获得/设置 组件 Class
    /// </summary>
    [Parameter]
    public string? Class { get; set; }

    /// <summary>
    /// 获得/设置 组件是否可见 默认 true 可见
    /// </summary>
    [Parameter]
    public bool Visible { get; set; } = true;

    /// <summary>
    /// 获得/设置 组件是否允许关闭 默认 true
    /// </summary>
    [Parameter]
    public bool ShowClose { get; set; } = true;

    /// <summary>
    /// 获得/设置 组件宽度百分比 默认 null 未设置
    /// </summary>
    [Parameter]
    public int? Width { get; set; }

    /// <summary>
    /// 获得/设置 组件高度百分比 默认 null 未设置
    /// </summary>
    [Parameter]
    public int? Height { get; set; }

    /// <summary>
    /// 获得/设置 组件唯一标识值 默认 null 未设置时取 Title 作为唯一标识
    /// </summary>
    [Parameter]
    public string? Key { get; set; }

    /// <summary>
    /// 获得/设置 组件状态
    /// </summary>
    [Parameter]
    public object? ComponentState { get; set; }

    /// <summary>
    /// 获得/设置 子组件
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        ComponentState = new { Id, ShowClose, Class, Key = Key ?? Title };
        Type = DockContentType.Component;
    }

    /// <summary>
    /// 设置 Visible 参数方法
    /// </summary>
    /// <param name="visible"></param>
    public void SetVisible(bool visible)
    {
        Visible = visible;
    }
}
