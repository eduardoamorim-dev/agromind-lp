# AgroMind - Landing Page de Startup AgroTech

Esta é uma landing page moderna e altamente interativa para uma startup de tecnologia agrícola que utiliza inteligência artificial para ajudar produtores rurais a combater pragas em suas plantações.

## 🌱 Características

- Design moderno e inovador com animações fluidas
- Interface responsiva e otimizada para todos os dispositivos
- Componentes interativos que melhoram a experiência do usuário
- Simulador de IA para demonstração do produto
- Efeitos visuais avançados (partículas, parallax, etc.)
- Otimizado para SEO e conversão
- Performance de carregamento rápido

## 🚀 Tecnologias

- **Next.js 14** - Framework React com foco em performance
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos e customizáveis

## 🛠️ Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/agroia-landing.git
cd agroia-landing
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🖼️ Imagens

É necessário adicionar as seguintes imagens ao projeto:

- `/public/images/logo.svg` - Logo da AgroIA
- `/public/images/logo-white.svg` - Logo branco para fundo escuro
- `/public/images/hero-bg.jpg` - Imagem de fundo da seção hero
- `/public/images/field-background.jpg` - Imagem de campo agrícola
- `/public/images/testimonial-1.jpg`, `/public/images/testimonial-2.jpg`, `/public/images/testimonial-3.jpg` - Fotos de depoimentos
- `/public/images/app-screen-1.jpg`, `/public/images/app-screen-2.jpg`, `/public/images/app-screen-3.jpg` - Screenshots do aplicativo
- `/public/images/ai-recommendation.jpg` - Imagem da recomendação de IA
- `/public/images/soybean-rust.jpg` - Imagem de ferrugem da soja
- `/public/images/feature-*.png` - Imagens para as features
- `/public/images/partners/*.svg` - Logos de parceiros
- `/public/images/grid-pattern.png` - Padrão de grade para fundos
- `/public/images/og-image.jpg` - Imagem para compartilhamento em redes sociais

## 📱 Responsividade

A landing page foi projetada para funcionar perfeitamente em:

- Desktops e laptops (1200px+)
- Tablets (768px - 1199px)
- Smartphones (até 767px)

## 🔧 Customização

Para personalizar este projeto:

1. **Cores**: Altere as cores no arquivo `tailwind.config.js`
2. **Conteúdo**: Modifique o texto e imagens nos componentes
3. **Fontes**: Altere a fonte no arquivo `app/layout.js`
4. **Imagens**: Substitua as imagens na pasta `public/images/`

## 📊 Analytics e SEO

Para obter o máximo da landing page:

1. Adicione seu ID do Google Analytics no arquivo `app/layout.js`
2. Personalize as meta tags em `app/layout.js`
3. Configure o arquivo `app/sitemap.js` com suas URLs

## 🚀 Deploy

Para fazer deploy da landing page:

1. **Vercel** (recomendado para Next.js):

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**:
   - Construa o projeto: `npm run build`
   - Deploy: `netlify deploy --prod`

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através de [contato@agroia.com.br](mailto:contato@agroia.com.br).
