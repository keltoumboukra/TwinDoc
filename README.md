# TwinDoc

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Weights & Biases](https://img.shields.io/badge/Weights%20&%20Biases-enabled-blue)](https://wandb.ai/)
[![Agno](https://img.shields.io/badge/Agno-powered-blue)](https://github.com/agno-ai/agno)

A digital twin assistant that enables global collaboration between clinicians and streamlines medical documentation workflows. Built with [Agno](https://github.com/agno-ai/agno), an open-source framework for building reliable AI agents.

## Description

TwinDoc is an innovative platform that creates digital twins for medical practitioners, enabling the sharing of deep medical expertise across the globe in real-time. It serves as a bridge between healthcare professionals, allowing them to:
- Discuss complex medical cases through their digital representations
- Share and access specialized medical knowledge instantly
- Streamline medical documentation and clinical workflows
- Facilitate global medical collaboration and consultation

## Features

- Real-time collaboration between medical professionals
- Secure medical knowledge sharing and documentation
- AI-powered digital twin representation of clinical expertise
- Integration with modern medical workflow systems
- Multi-modal communication support
- Automated logging and tracking of medical queries via Weights & Biases

## Prerequisites

- Python 3.8 or higher
- An OpenAI API key
- Gemini API access (if applicable)
- Weights & Biases account for logging

## Installation

1. Clone the repository:

```bash
git clone https://github.com/keltoumboukra/TwinDoc.git
cd twindoc
```

2. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate  # For Linux/MacOS
# or
.venv\Scripts\activate     # For Windows
```

3. Install required packages:

```bash
pip install -U google-genai lancedb agno tantivy sqlalchemy wandb weave
```

4. Set up your environment variables:

```bash
# For Linux/MacOS
export GOOGLE_API_KEY=your-api-key-here
export WANDB_API_KEY=your-wandb-key-here

# For Windows
set GOOGLE_API_KEY=your-api-key-here
set WANDB_API_KEY=your-wandb-key-here
```

To get your Google API key:
1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key or copy your existing one
3. Store it securely using one of these methods:

Method 1: Add to your shell configuration (recommended for development):
```bash
# For bash (add to ~/.bashrc)
echo 'export GOOGLE_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc

# For zsh (add to ~/.zshrc)
echo 'export GOOGLE_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

Method 2: Create a .env file in the project root:
```bash
echo 'GOOGLE_API_KEY=your-api-key-here' > .env
```
Note: Make sure to add `.env` to your `.gitignore` to keep your API key private.

To verify your API key is set correctly:
```bash
echo $GOOGLE_API_KEY
```

## Usage

1. Import and use the medical query function:

```python
from medical_query import query_medical_thinking

# Ask a medical question
response = query_medical_thinking(
    question="What are the key differentials for acute chest pain?",
    project_name="my-medical-project"  # Optional: defaults to "my-medical-project"
)

print(response)
```

2. Monitor your queries and responses in the Weights & Biases dashboard at `https://wandb.ai/your-username/my-medical-project`

## Logging and Monitoring

TwinDoc uses Weights & Biases for comprehensive logging and monitoring:

- All medical queries and responses are automatically logged
- Track conversation history and agent performance
- Monitor usage patterns and response times
- Access detailed analytics through the W&B dashboard

## Documentation

For detailed setup instructions and usage guidelines, please refer to our [documentation](https://docs.agno.com/how-to/install).

## Troubleshooting

Common issues and their solutions:

1. API Connection Issues
   - Verify your API keys are correctly set in environment variables
   - Check your internet connection
   - Ensure firewall settings allow the application to connect

2. Installation Problems
   - Make sure you have the correct Python version installed
   - Try upgrading pip: `pip install --upgrade pip`
   - Check system requirements are met

3. Logging Issues
   - Verify your W&B API key is correctly set
   - Check W&B project permissions
   - Ensure proper network connectivity to W&B servers

## Contributing

We welcome contributions to TwinDoc! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing coding style.

## Support

For support, please:
- Open an issue on GitHub
- Check the [documentation](https://docs.agno.com/how-to/install)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape TwinDoc
- Special thanks to the medical professionals who provided valuable feedback
- Built with support from the open-source community

---

Made with ❤️ for the global medical community
