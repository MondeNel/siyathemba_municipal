from sqlalchemy.orm import Session
import models
from datetime import datetime

def seed_database(db: Session):
    if db.query(models.Post).first():
        return

    posts = [
        models.Post(title="Water Supply Interruption – Prieska North", content="Residents of Prieska North are advised that water supply will be interrupted on 15 April 2026 from 08:00–17:00 for scheduled infrastructure maintenance. Water tankers will be available at the civic centre.", category="Infrastructure", author="Technical Services", created_at=datetime(2026,4,10)),
        models.Post(title="Mayor's Report: Q1 Service Delivery Update", content="The Executive Mayor presents the Q1 2026 service delivery report highlighting achievements in road rehabilitation, housing projects, and community facilities expansion across all wards.", category="Council", author="Office of the Mayor", created_at=datetime(2026,4,9)),
        models.Post(title="Free Basic Services Programme Extended", content="The municipality has approved the extension of the Free Basic Services Programme to an additional 1,200 indigent households. Applications open at all ward offices from 1 May 2026.", category="Community", author="Community Services", created_at=datetime(2026,4,2)),
        models.Post(title="Road Rehabilitation: Main Street Prieska", content="The Technical Services Department announces the commencement of Main Street rehabilitation works starting 20 April. Motorists are advised to use alternative routes.", category="Infrastructure", author="Technical Services", created_at=datetime(2026,3,28)),
        models.Post(title="Youth Skills Development Programme – Enroll Now", content="Siyathemba Municipality in partnership with the SETA is offering free skills training in construction, plumbing and electrical. Youth aged 18–35 are encouraged to apply.", category="Community", author="Community Services", created_at=datetime(2026,3,20)),
        models.Post(title="Infrastructure Grant: R12.3m Awarded for Bulk Water", content="The Department of CoGTA has approved a R12.3 million infrastructure grant for Siyathemba. Funds will be used for bulk water infrastructure in Niekerkshoop.", category="Finance", author="Finance Department", created_at=datetime(2026,3,15)),
    ]
    db.add_all(posts)

    events = [
        models.Event(title="Community Imbizo – Ward 3", description="The Executive Mayor will host a community imbizo to discuss service delivery challenges and municipal plans for Ward 3.", date="2026-04-18", time="10:00", location="Ward 3 Community Hall, Prieska", category="Council Engagement", created_at=datetime(2026,4,10)),
        models.Event(title="Budget 2026/27 Public Participation", description="Citizens are invited to participate in the municipal budget process.", date="2026-04-22", time="09:00", location="Civic Centre, Prieska", category="Finance", created_at=datetime(2026,4,9)),
        models.Event(title="Freedom Day Commemoration", description="The municipality invites all residents to the official Freedom Day commemoration ceremony.", date="2026-04-27", time="08:00", location="Prieska Stadium", category="Civic", created_at=datetime(2026,4,5)),
        models.Event(title="Indigent Register Update Drive", description="Municipal officials will visit all wards to update the indigent register.", date="2026-05-05", time="08:00", location="All Wards – Mobile Units", category="Community", created_at=datetime(2026,4,1)),
        models.Event(title="Youth Day Sports Festival", description="Annual Youth Day sports festival hosted by Community Services.", date="2026-06-16", time="08:00", location="Prieska Sports Grounds", category="Civic", created_at=datetime(2026,3,20)),
    ]
    db.add_all(events)

    docs = [
        models.Document(title="Draft Budget 2026/27", description="Siyathemba Local Municipality Draft Budget and Tariffs for the 2026/27 financial year.", file_url="#", category="Budget & Tariffs", file_size="2.4 MB", file_type="PDF", downloads=312, created_at=datetime(2026,4,10)),
        models.Document(title="Annual Financial Statements 2024/25", description="Audited Annual Financial Statements as required by the MFMA.", file_url="#", category="Annual Reports", file_size="5.1 MB", file_type="PDF", downloads=189, created_at=datetime(2026,2,15)),
        models.Document(title="Integrated Development Plan (IDP) 2022–2027", description="Five-year Integrated Development Plan guiding municipal service delivery.", file_url="#", category="IDP", file_size="8.7 MB", file_type="PDF", downloads=445, created_at=datetime(2022,7,1)),
        models.Document(title="SCM Policy – Supply Chain Management", description="Municipal Supply Chain Management Policy in compliance with MFMA regulations.", file_url="#", category="Policies", file_size="1.2 MB", file_type="PDF", downloads=98, created_at=datetime(2024,1,10)),
        models.Document(title="Spatial Development Framework 2023", description="Land use planning and spatial development framework for Siyathemba.", file_url="#", category="Planning", file_size="14.3 MB", file_type="PDF", downloads=76, created_at=datetime(2023,5,20)),
        models.Document(title="Draft Tariffs 2026/27 – Schedule A", description="Draft tariff schedule for water, electricity, refuse removal and other municipal services.", file_url="#", category="Budget & Tariffs", file_size="0.8 MB", file_type="PDF", downloads=201, created_at=datetime(2026,4,9)),
    ]
    db.add_all(docs)

    notices = [
        models.Notice(title="Chief Traffic Officer: Law Enforcement & Licensing", content="Applications are invited for the post of Chief Traffic Officer. Closing date: 20 April 2026.", category="vacancy", urgency="normal", created_at=datetime(2026,4,10)),
        models.Notice(title="Accountant Revenue – 1 Post", content="Applications for Accountant Revenue (1 Post). Minimum BCom Accounting. Closing date 30 April 2026.", category="vacancy", urgency="normal", created_at=datetime(2026,3,28)),
        models.Notice(title="Public Notice: Proposed Tariff Increases 2026/27", content="The municipality hereby gives notice of proposed tariff increases for water, electricity and refuse removal for public comment.", category="public", urgency="urgent", created_at=datetime(2026,4,5)),
        models.Notice(title="Media Release: Infrastructure Grant Awarded", content="The Department of CoGTA has approved a R12.3 million infrastructure grant for Siyathemba.", category="media", urgency="normal", created_at=datetime(2026,3,20)),
        models.Notice(title="Traffic Officer – DLTC: 1 Post", content="Siyathemba Municipality invites applications for Traffic Officer at the Driving Licence Testing Centre.", category="vacancy", urgency="normal", created_at=datetime(2026,3,15)),
    ]
    db.add_all(notices)

    tenders = [
        models.Tender(reference="SLM-T-2026-001", title="Supply and Installation of Solar Street Lights – Phase 2", description="Supply, delivery and installation of 120 solar-powered street lights across Prieska and Marydale.", category="tender", closing_date="2026-05-02", status="open", created_at=datetime(2026,4,10)),
        models.Tender(reference="SLM-Q-2026-014", title="Provision of Catering Services – Imbizo Events", description="Quotations invited for catering services for municipal imbizo events.", category="quotation", closing_date="2026-04-18", status="open", created_at=datetime(2026,4,9)),
        models.Tender(reference="SLM-T-2025-019", title="Rehabilitation of Gravel Roads – Ward 1 & 2", description="Rehabilitation of approximately 12 km of gravel roads in Ward 1 and Ward 2.", category="tender", closing_date="2025-11-30", status="awarded", created_at=datetime(2025,10,1)),
        models.Tender(reference="SLM-T-2026-002", title="Construction of Multi-Purpose Community Centre – Niekerkshoop", description="Design and construction of a multi-purpose community facility.", category="tender", closing_date="2026-05-15", status="open", created_at=datetime(2026,4,2)),
        models.Tender(reference="SLM-Q-2026-015", title="Maintenance of Municipal Vehicle Fleet", description="Quotations for servicing and maintenance of 18 municipal vehicles for 12 months.", category="quotation", closing_date="2026-04-25", status="open", created_at=datetime(2026,4,8)),
    ]
    db.add_all(tenders)

    db.commit()
