# TwinDoc

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)

A digital twin assistant that enables global collaboration between clinicians and streamlines medical documentation workflows.

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

## Prerequisites

- Python 3.8 or higher
- An OpenAI API key
- Gemini API access (if applicable)

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
pip install -U google-genai lancedb agno tantivy sqlalchemy
```

4. Set up your environment variables:

```bash
export GOOGLE_API_KEY=your-api-key-here    # For Linux/MacOS
# or
set GOOGLE_API_KEY=your-api-key-here       # For Windows
```

## Usage

1. Start the TwinDoc application:

```bash
python main.py
```

2. Access the web interface through your browser at `http://localhost:8000` (default port)

3. Follow the on-screen instructions to set up your digital twin profile

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
- Join our [community discussions](https://github.com/keltoumboukra/TwinDoc/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape TwinDoc
- Special thanks to the medical professionals who provided valuable feedback
- Built with support from the open-source community

---

Made with ❤️ for the global medical community
