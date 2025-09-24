(function() {
    'use strict';
    
    console.log('[Chatwoot Visual] Iniciando customização visual...');
    
    // Aguardar DOM estar pronto
    function waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    waitForDOM(function() {
        // Criar e injetar estilos CSS
        const style = document.createElement("style");
        style.setAttribute('data-chatwoot-visual', 'true');
        style.textContent = `
        /* ============================================ */
        /* LISTA DE CONVERSAS - CARDS MODERNOS         */
        /* ============================================ */
        
        /* Reset do container principal */
        .vue-recycle-scroller__item-view {
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .vue-recycle-scroller__item-view > div[data-index] {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: none !important;
        }
        
        /* Cards de conversa - Tema Escuro */
        .vue-recycle-scroller__item-view > div[data-index] > .conversation,
        .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start {
            border-radius: 13px !important;
            background-color: rgba(255, 255, 255, 0.035) !important;
            margin: 4px 0 0 0 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
            border: 1px solid rgba(80, 80, 90, 0.07) !important;
            padding: 2px 5px !important;
            width: 98.5% !important;
            max-width: 760px !important;
            min-width: 0 !important;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease !important;
            display: flex !important;
            align-items: center !important;
            position: relative;
            will-change: transform;
        }
        
        /* Margens para primeiro e último item */
        .vue-recycle-scroller__item-view:first-child > div[data-index] > div.relative.flex.items-start {
            margin-top: 4px !important;
        }
        
        .vue-recycle-scroller__item-view:last-child > div[data-index] > div.relative.flex.items-start {
            margin-bottom: 4px !important;
        }
        
        /* Efeito hover */
        .vue-recycle-scroller__item-view > div[data-index] > .conversation:hover,
        .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start:hover {
            background-color: rgba(255, 255, 255, 0.09) !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14) !important;
            transform: translateY(-1px) scale(1.004) translateZ(0) !important;
        }
        
        /* Estados ativos/selecionados */
        .vue-recycle-scroller__item-view > div[data-index].active > .conversation,
        .vue-recycle-scroller__item-view > div[data-index] > .conversation.active,
        .vue-recycle-scroller__item-view > div[data-index].selected > .conversation,
        .vue-recycle-scroller__item-view > div[data-index] > .conversation.selected,
        .vue-recycle-scroller__item-view > div[data-index].active > div.relative.flex.items-start,
        .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start.active,
        .vue-recycle-scroller__item-view > div[data-index] > div.animate-card-select {
            background: linear-gradient(98deg, rgba(99, 102, 241, 0.1) 40%, rgba(99, 102, 241, 0.07) 100%) !important;
            box-shadow: 0 6px 22px rgba(99, 102, 241, 0.14) !important;
            border: 1.5px solid rgba(99, 102, 241, 0.22) !important;
            z-index: 3;
        }
        
        /* ============================================ */
        /* TEMA CLARO - Lista de conversas             */
        /* ============================================ */
        
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > .conversation,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start {
            background: #fff !important;
            border: 1px solid rgba(0, 0, 0, 0.06) !important;
            box-shadow: 0 2px 10px rgba(60, 60, 70, 0.08) !important;
        }
        
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > .conversation:hover,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start:hover {
            background: #f7f9fb !important;
            box-shadow: 0 8px 20px rgba(60, 60, 70, 0.14) !important;
        }
        
        /* Estados ativos - Tema Claro */
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index].active > .conversation,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > .conversation.active,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index].selected > .conversation,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > .conversation.selected,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index].active > div.relative.flex.items-start,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > div.relative.flex.items-start.active,
        body:not(.dark) .vue-recycle-scroller__item-view > div[data-index] > div.animate-card-select {
            background: linear-gradient(98deg, rgba(99, 102, 241, 0.08) 40%, rgba(99, 102, 241, 0.03) 100%) !important;
            border: 1.5px solid rgba(99, 102, 241, 0.18) !important;
            box-shadow: 0 6px 18px rgba(99, 102, 241, 0.09) !important;
        }
        
        /* ============================================ */
        /* PRIORIDADE À ESQUERDA - INVERSÃO DE ORDEM   */
        /* ============================================ */
        
        /* Inverter a ordem dos spans dentro do container */
        .conversation .flex.items-center.gap-2.flex-shrink-0 {
            flex-direction: row-reverse !important;
        }
        
        /* ============================================ */
        /* AVATARES                                     */
        /* ============================================ */
        
        .conversation .user-thumbnail-box,
        .conversation .user-thumbnail,
        .conversation .avatar-container,
        .conversation .group\\/avatar,
        .conversation span[role="img"],
        .conversation .relative.inline-flex.group\\/avatar {
            width: 50px !important;
            height: 50px !important;
            min-width: 50px !important;
            max-height: 50px !important;
            margin-right: 10px !important;
            margin-top: auto !important;
            margin-bottom: auto !important;
            border-radius: 50% !important;
        }
        
        .conversation .user-thumbnail-box img,
        .conversation .user-thumbnail img,
        .conversation .avatar-container img,
        .conversation span[role="img"] img {
            width: 100% !important;
            height: 100% !important;
            border-radius: 50% !important;
            object-fit: cover !important;
        }
        
        /* Checkbox sobre avatar */
        .conversation .relative > label.flex.items-center.justify-center.rounded-full,
        .conversation label[class*="checkbox"] {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 50px !important;
            height: 50px !important;
            z-index: 10 !important;
            background: rgba(0, 0, 0, 0.1) !important;
            border-radius: 50% !important;
            margin: 0 !important;
        }
        
        /* Ocultar badges desnecessários */
        .conversation .source-badge {
            display: none !important;
        }
        
        /* Ícone de origem da conversa */
        .conversation .absolute.z-20.flex.items-center.justify-center.rounded-full {
            position: absolute !important;
            z-index: 15 !important;
            width: 14.2px !important;
            height: 14.2px !important;
            top: 34.8182px !important;
            left: 34.8182px !important;
            border-radius: 50% !important;
            background: var(--n-solid-1, #fff) !important;
            border: 1px solid var(--n-border, rgba(0,0,0,0.1)) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
        }
        
        /* Ícone dentro do badge */
        .conversation .absolute.z-20.flex.items-center.justify-center.rounded-full span {
            width: 100% !important;
            height: 100% !important;
            display: block !important;
        }
        
        /* Tema escuro - ícone de origem */
        body.dark .conversation .absolute.z-20.flex.items-center.justify-center.rounded-full {
            background: var(--n-solid-1, #2a2a2a) !important;
            border-color: var(--n-border, rgba(255,255,255,0.1)) !important;
        }
        
        /* ============================================ */
        /* LAYOUT E TEXTOS                              */
        /* ============================================ */
        
        .conversation .border-b {
            border-bottom: none !important;
        }
        
        .conversation {
            border-left: none !important;
            overflow: hidden !important;
        }
        
        /* Meta informações */
        .conversation .conversation--meta,
        .conversation .absolute.flex.flex-col {
            top: 28px !important;
            right: 16px !important;
        }
        
        .conversation .conversation--meta,
        .conversation .text-xs {
            margin-right: 8px !important;
            padding-right: 4px !important;
        }
        
        /* Context flex */
        .conversation > div:not(:first-child) {
            overflow: hidden !important;
            min-width: 0 !important;
            flex: 1 !important;
        }
        
        /* Textos com ellipsis */
        .conversation .text-sm,
        .conversation .text-base,
        .conversation .font-medium,
        .conversation .text-gray-700,
        .conversation .text-gray-600,
        .conversation h4,
        .conversation .font-semibold,
        .conversation .conversation--user {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            max-width: 100% !important;
        }
        
        .conversation .conversation--meta {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            max-width: calc(100% - 60px) !important;
        }
        
		/* Mensagens */
		.conversation .conversation--message,
		.conversation div.overflow-hidden.text-ellipsis.whitespace-nowrap.my-0.mx-2,
		.conversation div.overflow-hidden.text-ellipsis.whitespace-nowrap.my-0.mx-2 span {
			width: 95% !important;
			font-size: 11px !important;
			overflow: hidden !important;
			text-overflow: ellipsis !important;
			white-space: nowrap !important;
		}

		/* ==== CORREÇÃO ESPECÍFICA PARA O CONTEÚDO DA MENSAGEM ==== */
		.conversation div.overflow-hidden.text-ellipsis.whitespace-nowrap.my-0.mx-2 {
			max-width: calc(100% - 50px) !important;
			padding-right: 10px !important;
			overflow: hidden !important;
			text-overflow: ellipsis !important;
			white-space: nowrap !important;
			width: auto !important;
		}
        
        /* Status indicators */
        .conversation .bg-green-400,
        .conversation .bg-green-500,
        .conversation .w-3.h-3,
        .conversation .rounded-full {
            position: relative !important;
            top: 0px !important;
            margin-top: 0px !important;
        }
        
        /* ============================================ */
        /* BACKGROUNDS PERSONALIZADOS DAS MENSAGENS    */
        /* ============================================ */
        
        /* TEMA ESCURO - Fundo e mensagens */
        body.dark .messages-wrap,
        body.dark .conversation-panel,
        body.dark .conversation-panel__wrap {
            background: url('https://tankapi.infratechro.com.br/chatwoot/escuro.png') repeat !important;
            background-color: #1e1e1e !important;
            background-size: auto !important;
        }
        
        body.dark .message-content.incoming {
            background-color: rgba(255, 255, 255, 0.05) !important;
            color: #e5e5e5 !important;
            border-radius: 10px !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        
        body.dark .message-content.outgoing {
            background-color: rgba(132, 204, 22, 0.15) !important;
            color: #fff !important;
            border-radius: 10px !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        
        /* TEMA CLARO - Fundo e mensagens */
        body:not(.dark) .messages-wrap,
        body:not(.dark) .conversation-panel,
        body:not(.dark) .conversation-panel__wrap {
            background: url('https://tankapi.infratechro.com.br/chatwoot/claro.png') repeat !important;
            background-color: #f3f1ea !important;
            background-size: auto !important;
        }
        
        body:not(.dark) .message-content.incoming {
            background-color: rgba(0, 0, 0, 0.025) !important;
            color: #2c2c2c !important;
            border-radius: 10px !important;
            border: 1px solid rgba(0, 0, 0, 0.03) !important;
        }
        
        body:not(.dark) .message-content.outgoing {
            background-color: rgba(132, 204, 22, 0.12) !important;
            color: #1a1a1a !important;
            border-radius: 10px !important;
            border: 1px solid rgba(0, 0, 0, 0.03) !important;
        }
        `;
        
        document.head.appendChild(style);
        console.log('[Chatwoot Visual] Estilos aplicados com sucesso!');
    });
    
})();
