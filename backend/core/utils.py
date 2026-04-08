import PyPDF2
import docx
import re
from .job_data import JOB_DATABASE

SKILL_ALIASES = {
    "javascript": ["js", "javascript"],
    "react": ["react", "reactjs"],
    "node": ["node", "nodejs"],
    "python": ["python", "py"],
}

# PDF -> Text
def extract_text_from_pdf(pdf_file):
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""

        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content

        return text
    except Exception as e:
        print(f"PDF Extraction Error: {e}")
        return ""

# DOCX -> Text
def extract_text_from_docx(docx_file):
    try:
        doc = docx.Document(docx_file)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        print(f"DOCX Extraction Error: {e}")
        return ""


# Extract Email
def extract_email(text):
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    match = re.search(pattern, text)
    return match.group(0) if match else None

# Extract Phone Number
def extract_phone(text):
    pattern = r"\+?\d[\d\s-]{8,}\d"
    match = re.search(pattern, text)
    return match.group(0) if match else None



# Extract Resume Skills Based On JOB_DATABASE
def extract_resume_skills(resume_text):
    resume_text = resume_text.lower()
    found_skills = set()

    for job in JOB_DATABASE.values():
        for skill in job["skills"]:
            skill_lower = skill.lower()

            # Get aliases for this skill
            aliases = SKILL_ALIASES.get(skill_lower, [skill_lower])

            for alias in aliases:
                # Check for word boundaries to avoid partial matches (e.g., 'go' in 'google')
                if re.search(rf"\b{re.escape(alias)}\b", resume_text):
                    found_skills.add(skill_lower)
                    break

    return list(found_skills)



# Analyze Job Match
def analyze_job_match(resume_text, job_desc):
    resume_text = resume_text.lower()
    job_desc = job_desc.lower()
    
    # 1. Extract skills from resume
    resume_skills = extract_resume_skills(resume_text)
    
    # 2. Extract potential skills from JD (using our skill database as reference)
    required_skills = set()
    
    # Check if job_desc itself contains any known skills from our database
    for job in JOB_DATABASE.values():
        for skill in job["skills"]:
            skill_lower = skill.lower()
            aliases = SKILL_ALIASES.get(skill_lower, [skill_lower])
            for alias in aliases:
                if re.search(rf"\b{re.escape(alias)}\b", job_desc):
                    required_skills.add(skill_lower)
                    break
    
    # If no technical skills found in JD, attempt to match using common job titles
    if not required_skills:
        for job_title, data in JOB_DATABASE.items():
            if job_title in job_desc:
                for skill in data["skills"]:
                    required_skills.add(skill.lower())
    
    # Final fallback: If still empty, use a default set to ensure we show some result
    if not required_skills:
        required_skills = {"git", "python", "javascript"} # Generic fallback

    matched_skills = []
    missing_skills = []

    for req_skill in required_skills:
        if req_skill in resume_skills:
            matched_skills.append(req_skill)
        else:
            missing_skills.append(req_skill)

    score = (len(matched_skills) / len(required_skills)) * 100
    qualified = score >= 70

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_score": round(score, 2),
        "qualified": qualified,
        "total_required_count": len(required_skills)
    }


# Match Skills

# def match_skills(resume_text, job_desc):
#     resume_words = resume_text.lower().split()
#     job_words = job_desc.lower().split()

#     matched = set(resume_words) & set(job_words)

#     score = (len(matched) / len(set(job_words))) * 100 if job_words else 0

#     return list(matched), round(score, 2)