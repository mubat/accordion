(function ($) {
    function AccordionWidget(options) {
        this.element = $(options.targetBlock);
        this.itemsList = this.element.find('.accordion__content');

        let widget = this;
        this.element.data('accordionWidget', this);

        if (this.itemsList.find('.accordion__content.active').length === 0) {
            this.activateBlock(this.itemsList[0].id, true);
        }

        this.element.find('.accordion__title').on('click', function () {
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

    AccordionWidget.prototype.activateBlock = function (targetId, isActive) {
        this.element.find('#' + targetId).toggleClass('active', isActive);
        this.element.find('[data-content="' + targetId + '"]').toggleClass('active', isActive);
    };

    $.fn.accordion = function (options) {
        if (typeof options !== 'object') options = {};

        options.targetBlock = $(options.targetBlock || this);

        new AccordionWidget(options);
    };
}(window.jQuery));