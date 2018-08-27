(function ($) {
    function AccordionWidget(options) {
        this.widgetBlock = $(options.targetBlock);
        this.contentSelector = options.contentSelector || '.accordion__content';
        this.activeClass = 'active';
        this.titleSelector = '.accordion__title';
        this.itemsList = this.widgetBlock.find(this.contentSelector);

        let widget = this;
        this.widgetBlock.data('accordionWidget', this);

        if (this.getActive().length === 0) {
            this.activateBlock(this.itemsList[0].id, true);
        }

        this.widgetBlock.find(this.titleSelector).on('click', function () {
            widget.toggle(this);
        });
    }

    AccordionWidget.prototype.toggle = function (eventBlock) {
        eventBlock = $(eventBlock);
        if (eventBlock.data('content') !== null) {
            let widget = this;
            this.itemsList.each(function (index, item) {
                widget.activateBlock(item.id, item.id === eventBlock.data('content'));
            });
        }
    };

    AccordionWidget.prototype.getActive = function () {
        return this.widgetBlock.find(this.contentSelector + '.' + this.activeClass);
    };

    AccordionWidget.prototype.activateBlock = function (targetId, isActive) {
        this.widgetBlock.find('#' + targetId).toggleClass(this.activeClass, isActive);
        this.widgetBlock.find('[data-content="' + targetId + '"]').toggleClass(this.activeClass, isActive);
    };

    $.fn.accordion = function (options) {
        if (typeof options !== 'object') options = {};

        options.targetBlock = $(options.targetBlock || this);

        new AccordionWidget(options);
    };
}(window.jQuery));