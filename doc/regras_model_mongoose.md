### Principais Regras Aplicadas em um Model/Schema do Mongoose

O Mongoose é uma biblioteca de modelagem de dados para MongoDB e Node.js, que fornece uma solução baseada em esquema
para modelar dados da aplicação. A seguir, listamos e explicamos detalhadamente as principais regras e funcionalidades
aplicadas em um model/schema do Mongoose:

#### 1. **Campos Obrigatórios (`required`)**

- **Descrição**: Especifica que um campo é obrigatório. Se um documento for salvo sem este campo, um erro será gerado.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      required: true
    }
  });
  ```

#### 2. **Tipo de Dados (`type`)**

- **Descrição**: Define o tipo de dados que o campo deve armazenar. Pode
  ser `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array`, etc.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    anoPublicacao: {
      type: Number
    }
  });
  ```

#### 3. **Trim (`trim`)**

- **Descrição**: Remove automaticamente os espaços em branco no início e no final de uma string.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      trim: true
    }
  });
  ```

#### 4. **Valores Únicos (`unique`)**

- **Descrição**: Assegura que o valor do campo seja único no banco de dados.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    isbn: {
      type: String,
      unique: true
    }
  });
  ```

#### 5. **Valores Padrão (`default`)**

- **Descrição**: Define um valor padrão para o campo se nenhum valor for fornecido.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    disponivel: {
      type: Boolean,
      default: true
    }
  });
  ```

#### 6. **Validação Customizada (`validate`)**

- **Descrição**: Permite definir funções de validação personalizadas.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    anoPublicacao: {
      type: Number,
      validate: {
        validator: function(v: number) {
          return v >= 1440 && v <= new Date().getFullYear();
        },
        message: props => `${props.value} não é um ano de publicação válido!`
      }
    }
  });
  ```

#### 7. **Enumeração (`enum`)**

- **Descrição**: Define um conjunto de valores permitidos para o campo.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    categoria: {
      type: String,
      enum: ['Ficção', 'Não-Ficção', 'Fantasia', 'Romance']
    }
  });
  ```

#### 8. **Comprimento Mínimo e Máximo (`minlength`, `maxlength`)**

- **Descrição**: Define o comprimento mínimo e máximo para strings.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      minlength: 3,
      maxlength: 100
    }
  });
  ```

#### 9. **Valor Mínimo e Máximo (`min`, `max`)**

- **Descrição**: Define o valor numérico mínimo e máximo.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    anoPublicacao: {
      type: Number,
      min: 1440,
      max: new Date().getFullYear()
    }
  });
  ```

#### 10. **Indice (`index`)**

- **Descrição**: Cria um índice no campo para melhorar a performance de consultas.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      index: true
    }
  });
  ```

#### 11. **Auto-Incremento (`auto`)**

- **Descrição**: Utilizado para incrementar automaticamente valores numéricos, geralmente usado para IDs sequenciais.
- **Uso**: Necessita de um plugin adicional como `mongoose-auto-increment`.

#### 12. **Referências (`ref`)**

- **Descrição**: Utilizado para criar referências entre documentos. Define uma relação entre documentos em diferentes
  coleções.
- **Uso**:
  ```typescript
  const reviewSchema = new Schema({
    livro: {
      type: Schema.Types.ObjectId,
      ref: 'Livro'
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  });
  ```

#### 13. **Virtuals**

- **Descrição**: Campos que não são salvos no MongoDB, mas podem ser calculados ou derivados de outros campos.
- **Uso**:
  ```typescript
  livroSchema.virtual('resumo').get(function() {
    return `${this.titulo} por ${this.autor}`;
  });
  ```

#### 14. **Métodos de Instância**

- **Descrição**: Define métodos que podem ser chamados em instâncias dos modelos.
- **Uso**:
  ```typescript
  livroSchema.methods.findLivrosDoMesmoAutor = function() {
    return this.model('Livro').find({ autor: this.autor });
  };
  ```

#### 15. **Métodos Estáticos**

- **Descrição**: Define métodos que podem ser chamados diretamente no modelo.
- **Uso**:
  ```typescript
  livroSchema.statics.findByTitulo = function(titulo: string) {
    return this.find({ titulo: new RegExp(titulo, 'i') });
  };
  ```

#### 16. **Middlewares (`pre` e `post`)**

- **Descrição**: Middlewares são funções que podem ser executadas antes (`pre`) ou depois (`post`) de certos eventos no
  Mongoose, como salvar, validar, ou remover um documento.
- **Uso**:
  ```typescript
  livroSchema.pre('save', function(next) {
    console.log('Um livro está prestes a ser salvo.');
    next();
  });

  livroSchema.post('save', function(doc) {
    console.log(`${doc.titulo} foi salvo.`);
  });
  ```

#### 17. **Campos Imutáveis (`immutable`)**

- **Descrição**: Campos que, uma vez definidos, não podem ser modificados.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      immutable: true
    }
  });
  ```

#### 18. **Aliases**

- **Descrição**: Permite definir aliases para campos, de modo que podem ser referenciados por outro nome no código.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    titulo: {
      type: String,
      alias: 'nomeDoLivro'
    }
  });

  // Uso: livro.nomeDoLivro
  ```

#### 19. **Campos Dinâmicos (`mixed`)**

- **Descrição**: Permite armazenar dados arbitrários em um campo, útil quando a estrutura do campo pode variar.
- **Uso**:
  ```typescript
  const livroSchema = new Schema({
    metadados: {
      type: Schema.Types.Mixed
    }
  });
  ```

#### 20. **Customizando a Saída de JSON (`toJSON`)**

- **Descrição**: Permite customizar a forma como os documentos são convertidos para JSON.
- **Uso**:
  ```typescript
  livroSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    }
  });
  ```

Estas são algumas das principais regras e funcionalidades que podem ser aplicadas em um schema/model do Mongoose,
proporcionando uma grande flexibilidade e controle sobre como os dados são modelados e manipulados em uma aplicação
Node.js.