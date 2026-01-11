# Component 1: AI Scenario Generator (Basiii)

## 🏛️ Overview
The **AI Scenario Generator** is a high-performance research module designed for dynamic cultural inquiry. Using Retrieval-Augmented Generation (RAG), it allows users to explore "What-If" historical scenarios, providing evidence-based, structured responses grounded in verified museum datasets.

## 🚀 Functionality
- **Dynamic Scenario Exploration**: Generates speculative yet historically grounded outcomes for user-defined queries (e.g., "What if the Kandyan Kingdom won the battle of 1803?").
- **Structured Knowledge Retrieval**: Breaks down complex historical responses into three distinct categories: **Ritual**, **Colonial**, and **Political** impacts.
- **Evidence-Grounded Reasoning**: Unlike standard LLMs, this system retrieves specific artifact context before generating an answer, ensuring high historical accuracy.

## 🛠️ Technical Implementation
- **Architecture**: Retrieval-Augmented Generation (RAG).
- **Backend**: Flask (Python) REST API.
- **Vector Database**: **ChromaDB** for persistent semantic storage and high-speed similarity search.
- **AI Models**:
    - `text-embedding-3-small` (OpenAI): For converting historical text into high-dimensional vector representations.
    - `gpt-4-turbo-preview` (OpenAI): For generating structured, context-aware narratives.
- **Data Flow**:
    1. **Query Processing**: The user's question is embedded into a vector.
    2. **Context Retrieval**: The system searches the vector database for the most relevant artifact metadata.
    3. **Augmentation**: Retrieved context is combined with the query and sent to the LLM.
    4. **Structured Output**: The LLM returns a JSON response containing three distinct analytical topics.

## 🎯 Use Case
- **Museum Kiosks**: Transforming static artifact displays into interactive historical dialogue modules.
- **Academic Research**: Allowing scholars to test historical hypotheses against verified data.
- **Heritage Education**: Engaging students with "branching history" narratives to deepen understanding of causality in heritage.

## ✨ Novelty & Research Value
- **Mitigation of AI Hallucinations**: By using RAG, the system significantly reduces the risk of generating false historical facts.
- **Context-Aware Comparison**: Connects specific artifact IDs with broad historical events, bridging the gap between physical objects and abstract history.

## 🛠️ Pending Development (Roadmap)

### 1. Frontend Implementation
- **Interactive Console**: Development of a React-based interface featuring a "Type-to-Inquire" terminal aesthetic.
- **Visual Feedback**: Integration of artifact images that update dynamically as they are referenced in the AI's "What-If" scenario.
- **Export Feature**: Allowing researchers to export speculative narratives as PDF research notes.

### 2. Enhancing Response Quality
- **Dataset Expansion**: Increasing the RAG context window by indexing more archival documents (currently limited to a core dataset).
- **Fine-Tuning Iteration**: Further fine-tuning the GPT-4o-mini model with a larger corpus of vetted speculative historical analysis to improve tone and factual grounding.
- **Hyperparameter Optimization**: Tuning the `temperature` and `top_p` settings to balance creative speculation with historical accuracy.

### 3. Integration & Deployment
- **API Gateway**: Consolidating the backend into the main research suite for seamless data flow.
- **Caching**: Implementing a Redis cache for frequently asked "What-If" scenarios to reduce API latency.
