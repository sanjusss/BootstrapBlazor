﻿import '../../topology.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export function init(id, invoker, data, callback) {
    const el = document.getElementById(id)

    const initCanvas = () => {
        const topology = createTopology(el, data)
        Data.set(id, { topology, el })

        invoker.invokeMethodAsync(callback)
    }

    // make sure el has height
    if (el.offsetHeight > 0 && el.offsetWidth > 0) {
        initCanvas()
    }
    else {
        const handler = setInterval(() => {
            if (el.offsetHeight > 0 && el.offsetWidth > 0) {
                clearInterval(handler)
                initCanvas()
            }
        }, 200)
    }
}

export function update(id, data) {
    const meta = Data.get(id)
    if (meta) {
        meta.topology.doSocket(JSON.stringify(data))
    }
}

export function scale(id, rate) {
    const meta = Data.get(id)
    if (meta) {
        meta.topology.scale(rate)
        meta.topology.centerView()
    }
}

export function reset(id) {
    const meta = Data.get(id)
    if (meta) {
        meta.topology.fitView()
        meta.topology.centerView()
    }
}

export function resize(id, width, height, el) {
    let topology = id
    if (typeof (id) === 'string') {
        const meta = Data.get(id)
        if (meta) {
            topology = meta.topology
            el = meta.el
        }
    }
    if (el.offsetHeight > 0 && el.offsetWidth > 0) {
        topology.canvas.dirty = true
        if (width && height) {
            topology.resize(width, height)
        }
        else {
            topology.resize()
        }
        topology.fitView()
        topology.centerView()
    }
}

export function dispose(id) {
    const meta = Data.get(id)

    Data.remove(id)
    if (meta) {
        meta.topology.destroy()
        delete meta.topology
    }
}

const createTopology = (el, data) => {
    const isSupportTouch = el.getAttribute('data-bb-support-touch') === 'true'
    const isFitView = el.getAttribute('data-bb-fit-view') === 'true'
    const isCenterView = el.getAttribute('data-bb-center-view') === 'true'

    const topology = hackTopology(el, isSupportTouch)
    topology.open(JSON.parse(data))
    topology.lock(1)

    if (isFitView) {
        topology.fitView()
    }
    if (isCenterView) {
        topology.centerView()
    }
    el.observer = new ResizeObserver(() => {
        resize(topology, null, null, el)
    })
    el.observer.observe(el)
    return topology
}

const hackTopology = (el, isSupportTouch) => {
    if (Topology.isHack === undefined) {
        Topology.isHack = true
        Topology.prototype.lock = function (status) {
            this.store.data.locked = status
            this.finishDrawLine(!0)
            this.canvas.drawingLineName = ""
            this.stopPencil()
        }
        Topology.prototype.connectSocket = function () {

        }
    }

    const topology = new Topology(el, {}, isSupportTouch)

    const originalCanvasResize = topology.canvas.resize
    topology.canvas.resize = function () {
        const width = this.parentElement.clientWidth
        const height = this.parentElement.clientHeight
        if (width > 0 && height > 0) {
            originalCanvasResize.call(this)
        }
    }
    return topology;
}
