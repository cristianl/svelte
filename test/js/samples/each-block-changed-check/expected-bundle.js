function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = null;
	this._state = {};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function get() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

var proto = {
	destroy,
	get,
	fire,
	on,
	set,
	_recompute: noop,
	_set,
	_mount,
	_unmount,
	_differs
};

/* generated by Svelte vX.Y.Z */

function create_main_fragment(component, state) {
	var text, p, text_1;

	var each_value = state.comments;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(component, assign(assign({}, state), {
			each_value: each_value,
			comment: each_value[i],
			i: i
		}));
	}

	return {
		c: function create() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text = createText("\n\n");
			p = createElement("p");
			text_1 = createText(state.foo);
		},

		m: function mount(target, anchor) {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insertNode(text, target, anchor);
			insertNode(p, target, anchor);
			appendNode(text_1, p);
		},

		p: function update(changed, state) {
			var each_value = state.comments;

			if (changed.comments || changed.elapsed || changed.time) {
				for (var i = 0; i < each_value.length; i += 1) {
					var each_context = assign(assign({}, state), {
						each_value: each_value,
						comment: each_value[i],
						i: i
					});

					if (each_blocks[i]) {
						each_blocks[i].p(changed, each_context);
					} else {
						each_blocks[i] = create_each_block(component, each_context);
						each_blocks[i].c();
						each_blocks[i].m(text.parentNode, text);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = each_value.length;
			}

			if (changed.foo) {
				text_1.data = state.foo;
			}
		},

		u: function unmount() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			detachNode(text);
			detachNode(p);
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);
		}
	};
}

// (1:0) {#each comments as comment, i}
function create_each_block(component, state) {
	var comment = state.comment, each_value = state.each_value, i = state.i;
	var div, strong, text, text_1, span, text_2_value = comment.author, text_2, text_3, text_4_value = state.elapsed(comment.time, state.time), text_4, text_5, text_6, raw_value = comment.html, raw_before;

	return {
		c: function create() {
			div = createElement("div");
			strong = createElement("strong");
			text = createText(i);
			text_1 = createText("\n\n\t\t");
			span = createElement("span");
			text_2 = createText(text_2_value);
			text_3 = createText(" wrote ");
			text_4 = createText(text_4_value);
			text_5 = createText(" ago:");
			text_6 = createText("\n\n\t\t");
			raw_before = createElement('noscript');
			this.h();
		},

		h: function hydrate() {
			span.className = "meta";
			div.className = "comment";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(strong, div);
			appendNode(text, strong);
			appendNode(text_1, div);
			appendNode(span, div);
			appendNode(text_2, span);
			appendNode(text_3, span);
			appendNode(text_4, span);
			appendNode(text_5, span);
			appendNode(text_6, div);
			appendNode(raw_before, div);
			raw_before.insertAdjacentHTML("afterend", raw_value);
		},

		p: function update(changed, state) {
			comment = state.comment;
			each_value = state.each_value;
			i = state.i;
			if ((changed.comments) && text_2_value !== (text_2_value = comment.author)) {
				text_2.data = text_2_value;
			}

			if ((changed.elapsed || changed.comments || changed.time) && text_4_value !== (text_4_value = state.elapsed(comment.time, state.time))) {
				text_4.data = text_4_value;
			}

			if ((changed.comments) && raw_value !== (raw_value = comment.html)) {
				detachAfter(raw_before);
				raw_before.insertAdjacentHTML("afterend", raw_value);
			}
		},

		u: function unmount() {
			detachAfter(raw_before);

			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);

export default SvelteComponent;
